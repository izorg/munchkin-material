import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import transitions, { duration, easing } from 'material-ui/styles/transitions';

import Fab from '../Fab';
import { noop } from '../../constants';
import Combat from '../../containers/Combat';
import PlayerForm from '../../containers/Player/Form';
import PlayerList from '../../containers/Player/List';
import PlayerSlider from '../../containers/Player/Slider';
import { classesObject } from '../../utils/propTypes';

import ScreenTransition from './ScreenTransition';

const styles = {
  app: {
    backgroundColor: '#000000',
    height: '100%',
    position: 'relative',
  },

  screen: {
    backgroundColor: '#FFFFFF',
    height: '100vh',
    left: 0,
    position: 'absolute',
    width: '100vw',
    top: 0,
    zIndex: 0,
  },


  enter: {},

  exit: {},


  fadeInUp: {
    opacity: 0,
    transform: 'translateY(100vw)',
  },

  fadeInUpActive: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: transitions.create(['opacity', 'transform'], {
      duration: duration.standard,
      easing: easing.easeOut,
    }),
  },


  fadeOutDown: {
    opacity: 1,
    transform: 'translateY(0)',
  },

  fadeOutDownActive: {
    opacity: 0,
    transform: 'translateY(100vh)',
    transition: transitions.create(['opacity', 'transform'], {
      duration: duration.standard,
      easing: easing.easeIn,
    }),
  },


  slideInRight: {
    transform: 'translateX(100vw)',
  },

  slideInRightActive: {
    transform: 'translateX(0)',
    transition: transitions.create('transform', {
      duration: duration.standard,
      easing: easing.easeOut,
    }),
  },


  slideOutRight: {
    transform: 'translateX(0)',
  },

  slideOutRightActive: {
    transform: 'translateX(100vw)',
    transition: transitions.create('transform', {
      duration: duration.standard,
      easing: easing.easeIn,
    }),
  },
};

class App extends Component {
  getChildContext() {
    const { buyFullVersion } = this.props;

    return { buyFullVersion };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <Helmet>
          <html lang={navigator.language} />
        </Helmet>

        <Route path="/">
          {({ match }) => match && (
            <PlayerList className={classes.screen} />
          )}
        </Route>

        <Route path="/new">
          {({ match }) => (
            <ScreenTransition
              classNames={{
                enter: classes.fadeInUp,
                enterActive: classes.fadeInUpActive,
                exit: classes.fadeOutDown,
                exitActive: classes.fadeOutDownActive,
              }}
              in={Boolean(match)}
              timeout={{
                enter: duration.standard,
                exit: duration.standard,
              }}
            >
              <PlayerForm />
            </ScreenTransition>
          )}
        </Route>

        <Route path="/player/:id">
          {({ match }) => (
            <ScreenTransition
              classNames={{
                enter: classes.slideInRight,
                enterActive: classes.slideInRightActive,
                exit: classes.slideOutRight,
                exitActive: classes.slideOutRightActive,
              }}
              in={Boolean(match)}
              timeout={{
                enter: duration.standard,
                exit: duration.standard,
              }}
            >
              <PlayerSlider />
            </ScreenTransition>
          )}
        </Route>

        <Route path="/edit/:id">
          {({ match }) => (
            <ScreenTransition
              classNames={{
                enter: classes.fadeInUp,
                enterActive: classes.fadeInUpActive,
                exit: classes.fadeOutDown,
                exitActive: classes.fadeOutDownActive,
              }}
              in={Boolean(match)}
              timeout={{
                enter: duration.standard,
                exit: duration.standard,
              }}
            >
              <PlayerForm />
            </ScreenTransition>
          )}
        </Route>

        <Route path="/player/:id/combat">
          {({ match }) => (
            <ScreenTransition
              classNames={{
                enter: classes.slideInRight,
                enterActive: classes.slideInRightActive,
                exit: classes.slideOutRight,
                exitActive: classes.slideOutRightActive,
              }}
              in={Boolean(match)}
              timeout={{
                enter: duration.standard,
                exit: duration.standard,
              }}
            >
              <Combat />
            </ScreenTransition>
          )}
        </Route>

        <Fab />
      </div>
    );
  }
}

App.childContextTypes = {
  buyFullVersion: PropTypes.func,
};

App.propTypes = {
  buyFullVersion: PropTypes.func,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

App.defaultProps = {
  buyFullVersion: noop,
};

export default withStyles(styles)(App);
