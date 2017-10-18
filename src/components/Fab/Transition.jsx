import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import transitions, { duration, easing } from 'material-ui/styles/transitions';

import { classesObject } from '../../utils/propTypes';

const styles = {
  item: {
    bottom: 0,
    position: 'absolute',
    right: 0,
  },

  enter: {
    transform: 'scale(0)',
  },

  enterActive: {
    transform: 'scale(1)',
    transition: transitions.create('transform', {
      delay: duration.enteringScreen,
      duration: duration.shortest,
      easing: easing.easeOut,
    }),
  },

  exit: {
    transform: 'scale(1)',
  },

  exitActive: {
    transform: 'scale(0)',
    transition: transitions.create('transform', {
      duration: duration.shortest,
      easing: easing.easeIn,
    }),
  },
};

const FabTransition = ({ children, classes, ...props }) => (
  <CSSTransition
    {...props}
    classNames={{
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.exit,
      exitActive: classes.exitActive,
    }}
    mountOnEnter
    timeout={{
      enter: duration.shortest + duration.enteringScreen,
      exit: duration.shortest,
    }}
    unmountOnExit
  >
    <div className={classes.item}>
      {children}
    </div>
  </CSSTransition>
);

FabTransition.propTypes = {
  children: PropTypes.node.isRequired,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(FabTransition);
