import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../../utils/propTypes';

const DURATION = 150;

const styles = theme => ({
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
    transition: theme.transitions.create('transform', {
      delay: DURATION,
      duration: DURATION,
      easing: theme.transitions.easing.easeOut,
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
    transition: theme.transitions.create('transform', {
      duration: DURATION,
      easing: theme.transitions.easing.easeIn,
    }),
  },
});

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
      enter: DURATION * 2,
      exit: DURATION,
    }}
  />
);

DiceTransition.propTypes = {
  classes: classesObject.isRequired,
};

export default withStyles(styles)(DiceTransition);
