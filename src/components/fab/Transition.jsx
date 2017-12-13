import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { withStyles, withTheme } from 'material-ui/styles';

import { classesObject, themeObject } from '../../utils/propTypes';

const styles = theme => ({
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

const FabTransition = ({ classes, theme, ...props }) => (
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
  />
);

FabTransition.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  theme: themeObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(withTheme()(FabTransition));
