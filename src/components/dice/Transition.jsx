import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
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
      delay: theme.transitions.duration.shortest,
      duration: theme.transitions.duration.shortest,
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
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
  },
});

const DiceTransition = ({ classes, theme, ...props }) => (
  <CSSTransition
    {...props}
    classNames={{
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.leave,
      exitActive: classes.leaveActive,
    }}
    timeout={{
      enter: theme.transitions.duration.shortest * 2,
      exit: theme.transitions.duration.shortest,
    }}
  />
);

export default withStyles(styles, { withTheme: true })(DiceTransition);
