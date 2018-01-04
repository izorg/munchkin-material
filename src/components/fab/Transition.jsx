import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { classesObject, themeObject } from '../../utils/propTypes';

const styles = theme => ({
  container: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
    zIndex: 2,
  },

  enter: {
    transform: 'scale(0)',
  },

  enterActive: {
    transform: 'scale(1)',
    transition: theme.transitions.create('transform', {
      delay: theme.transitions.duration.enteringScreen,
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeOut,
    }),
  },

  exit: {
    transform: 'scale(1)',
  },

  exitActive: {
    transform: 'scale(0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
  },
});

const Transition = ({
  classes, children, theme, ...props
}) => (
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
      appear: theme.transitions.duration.shortest + theme.transitions.duration.enteringScreen,
      enter: theme.transitions.duration.shortest + theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.shortest,
    }}
    unmountOnExit
    {...props}
  >
    <div className={classes.container}>
      {children}
    </div>
  </CSSTransition>
);

Transition.propTypes = {
  children: PropTypes.node,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  theme: themeObject.isRequired, // eslint-disable-line react/no-typos
};

Transition.defaultProps = {
  children: null,
};

export default withStyles(styles, { withTheme: true })(Transition);
