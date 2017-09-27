import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../../../utils/propTypes';

const DURATION = 150;

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
    transition: `transform ${DURATION}ms ease-out ${DURATION}ms`,
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
    transition: `transform ${DURATION}ms ease-in`,
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
      enter: 300,
      exit: 150,
    }}
  />
);

DiceTransition.propTypes = {
  classes: classesObject.isRequired,
};

export default withStyles(styles)(DiceTransition);
