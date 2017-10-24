import React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import transitions, { duration, easing } from 'material-ui/styles/transitions';

import Fab from '../Fab';
import Combat from '../../containers/Combat';
import DiceDialog from '../../containers/DiceDialog';
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

const App = ({ classes }) => (
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

    <DiceDialog />
  </div>
);

App.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(App);
