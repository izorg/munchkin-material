import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  enter: {
    transform: 'scale(0)',
  },

  enterActive: {
    transform: 'scale(1)',
    transition: theme.transitions.create('transform', {
      delay: theme.transitions.duration.leavingScreen,
      duration: theme.transitions.duration.enteringScreen,
      // easing: theme.transitions.easing.easeOut,
    }),
  },

  exit: {
    transform: 'scale(1)',
  },

  exitActive: {
    transform: 'scale(0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.leavingScreen,
      // easing: theme.transitions.easing.easeIn,
    }),
  },

  container: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
    zIndex: 2,
  },
});

const Transition = ({ classes, children, theme, ...props }) => (
  <CSSTransition
    classNames={{
      appear: classes.enter,
      appearActive: classes.enterActive,
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.exit,
      exitActive: classes.exitActive,
    }}
    mountOnEnter
    timeout={{
      enter:
        theme.transitions.duration.leavingScreen +
        theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    }}
    unmountOnExit
    {...props}
  >
    <div className={classes.container}>{children}</div>
  </CSSTransition>
);

Transition.propTypes = {
  children: PropTypes.node,
};

Transition.defaultProps = {
  children: null,
};

export default withStyles(styles, { withTheme: true })(Transition);
