import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  enter: {
    opacity: 0,
    transform: 'translateY(8%)',
    willChange: 'opacity, transform',
  },

  enterActive: {
    opacity: 1,
    transform: 'translateY(0);',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  leave: {
    opacity: 1,
    transform: 'translateY(0)',
    willChange: 'opacity, transform',
  },

  leaveActive: {
    opacity: 0,
    transform: 'translateY(8%)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

const DiceTransition = ({ classes, theme, ...props }) => (
  <CSSTransition
    {...props}
    classNames={{
      appear: classes.enter,
      appearActive: classes.enterActive,
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.leave,
      exitActive: classes.leaveActive,
    }}
    timeout={{
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    }}
  />
);

export default withStyles(styles, { withTheme: true })(DiceTransition);
