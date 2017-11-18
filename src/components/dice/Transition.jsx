import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { withStyles } from 'material-ui/es/styles';
import transitions, { duration, easing } from 'material-ui/es/styles/transitions';

import { classesObject } from '../../utils/propTypes';

const styles = {
  enter: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',

    transform: 'scale(0)',
  },

  enterActive: {
    transform: 'scale(1)',
    transition: transitions.create('transform', {
      delay: duration.shortest,
      duration: duration.shortest,
      easing: easing.easeOut,
    }),
  },

  leave: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',

    transform: 'scale(1)',
  },

  leaveActive: {
    transform: 'scale(0)',
    transition: transitions.create('transform', {
      duration: duration.shortest,
      easing: easing.easeIn,
    }),
  },
};

const DiceTransition = ({ classes, ...props }) => (
  <CSSTransition
    {...props}
    classNames={{
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.leave,
      exitActive: classes.leaveActive,
    }}
    timeout={{
      enter: duration.shortest * 2,
      exit: duration.shortest,
    }}
  />
);

DiceTransition.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(DiceTransition);
