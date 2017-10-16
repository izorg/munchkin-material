import React from 'react';
import { matchPath, Route, Switch, withRouter } from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../utils/propTypes';

import CombatButton from '../containers/Combat/Button';
import CombatHelperButton from '../containers/Combat/HelperButton';
import NewPlayerButton from '../containers/NewPlayerButton';

const buttons = {
  home: {
    component: NewPlayerButton,
    exact: true,
    path: '/',
  },

  slider: {
    component: CombatButton,
    exact: true,
    path: '/player/:id',
  },

  combat: {
    component: CombatHelperButton,
    path: '/player/:id/combat',
  },
};

const ANIMATION_DURATION = 150;
const ANIMATION_DELAY = 400;

const styles = {
  fabContainer: {
    bottom: 24,
    position: 'absolute',
    right: 24,
    zIndex: 3,
  },

  enter: {
    transform: 'scale(0)',
  },

  enterActive: {
    transform: 'scale(1)',
    transition: `transform ${ANIMATION_DURATION}ms ease-out ${ANIMATION_DELAY}ms`,
  },

  exit: {
    transform: 'scale(1)',
  },

  exitActive: {
    transform: 'scale(0)',
    transition: `transform ${ANIMATION_DURATION}ms ease-in`,
  },
};

const MainButton = ({ classes, location }) => (
  <TransitionGroup className={classes.fabContainer}>
    {Object.keys(buttons).some(key => matchPath(location.pathname, buttons[key])) && (
      <CSSTransition
        classNames={{
          enter: classes.enter,
          enterActive: classes.enterActive,
          exit: classes.exit,
          exitActive: classes.exitActive,
        }}
        timeout={{
          enter: ANIMATION_DURATION + ANIMATION_DELAY,
          exit: ANIMATION_DURATION,
        }}
      >
        <div>
          <Switch location={location}>
            {Object.keys(buttons).map(key => (
              <Route {...buttons[key]} key={key} />
            ))}
          </Switch>
        </div>
      </CSSTransition>
    )}
  </TransitionGroup>
);

MainButton.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(withStyles(styles)(MainButton));
