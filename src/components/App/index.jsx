import React from 'react';
import Helmet from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';

import Combat from '../../containers/Combat';
import CombatButton from '../../containers/Combat/Button';
import NewPlayerButton from '../../containers/NewPlayerButton';
import PlayerForm from '../../containers/Player/Form';
import PlayerList from '../../containers/Player/List';
import PlayerSlider from '../../containers/Player/Slider';
import { ios } from '../../helpers/platforms';

import pages, { getKey, getTransition } from './pages';
import Zoom from './transitions/Zoom';

import cn from './style.css';

const App = ({ location }) => (
  <div className={cn.app}>
    <Helmet>
      <html lang={navigator.language} />
      {
        ios ? <body className="ios" /> : null
      }
    </Helmet>

    <TransitionGroup className={cn.content}>
      <CSSTransition {...getTransition(location.pathname)} key={getKey(location.pathname)}>
        <div className={cn.item}>
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
        <div className={cn.fab}>
          <Switch>
            <Route component={NewPlayerButton} exact path="/" />
            <Route component={CombatButton} exact path="/player/:playerId" />
          </Switch>
        </div>
      </Zoom>
    </TransitionGroup>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
