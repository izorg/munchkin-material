import CSSTransition from 'react-transition-group/CSSTransition';
import { compose, mapProps, setDisplayName } from 'recompose';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  enter: {
    transform: 'scale(0)',
    willChange: 'transform',
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
    transform: 'scale(1)',
    willChange: 'transform',
  },

  leaveActive: {
    transform: 'scale(0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
  },
});

const addEndListener = (node, done) =>
  node.addEventListener('transitionend', done, false);

export default compose(
  withStyles(styles),
  setDisplayName('DiceTransition'),
  mapProps(({ classes, ...props }) => ({
    ...props,
    addEndListener,
    classNames: {
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.leave,
      exitActive: classes.leaveActive,
    },
  })),
)(CSSTransition);
