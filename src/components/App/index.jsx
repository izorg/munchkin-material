import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { noop } from '../../constants';
import Combat from '../../containers/Combat';
import CombatButton from '../../containers/Combat/Button';
import CombatHelperButton from '../../containers/Combat/HelperButton';
import NewPlayerButton from '../../containers/NewPlayerButton';
import PlayerForm from '../../containers/Player/Form';
import PlayerList from '../../containers/Player/List';
import PlayerSlider from '../../containers/Player/Slider';
import { classesObject } from '../../utils/propTypes';

import pages, { getKey, getTransition } from './pages';
import Zoom from './transitions/Zoom';

const styles = {
  app: {
    backgroundColor: '#000000',
    height: '100%',
    position: 'relative',
  },

  content: {
    height: '100%',
  },

  item: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },

  fab: {
    bottom: 24,
    position: 'absolute',
    right: 24,
    zIndex: 3,
  },
};

class App extends Component {
  getChildContext() {
    const { buyFullVersion } = this.props;

    return { buyFullVersion };
  }

  render() {
    const { classes, location } = this.props;

    return (
      <div className={classes.app}>
        <Helmet>
          <html lang={navigator.language} />
        </Helmet>

        <TransitionGroup className={classes.content}>
          <CSSTransition {...getTransition(location.pathname)} key={getKey(location.pathname)}>
            <div className={classes.item}>
              <Switch location={location}>
                <Route component={PlayerList} {...pages.home.route} />
                <Route component={PlayerForm} {...pages.form.route} />
                <Route component={PlayerSlider} {...pages.slider.route} />
                <Route component={PlayerForm} {...pages.editForm.route} />
                <Route component={Combat} {...pages.combat.route} />
                <Redirect to="/" />
              </Switch>
            </div>
          </CSSTransition>

          <Zoom>
            <div className={classes.fab}>
              <Switch>
                <Route component={NewPlayerButton} exact path="/" />
                <Route component={CombatButton} exact path="/player/:playerId" />
                <Route component={CombatHelperButton} path="/player/:playerId/combat" />
              </Switch>
            </div>
          </Zoom>
        </TransitionGroup>
      </div>
    );
  }
}

App.childContextTypes = {
  buyFullVersion: PropTypes.func,
};

App.propTypes = {
  buyFullVersion: PropTypes.func,
  classes: classesObject.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

App.defaultProps = {
  buyFullVersion: noop,
};

export default withRouter(withStyles(styles)(App));
