import React from 'react';
import { withStyles, withTheme } from 'material-ui/styles';

import { classesObject, themeObject } from '../../../utils/propTypes';

import ScreenTransition from './ScreenTransition';

const styles = theme => ({
  fadeInUp: {
    opacity: 0,
    transform: 'translateY(100vw)',
  },

  fadeInUpActive: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },

  fadeOutDown: {
    opacity: 1,
    transform: 'translateY(0)',
  },

  fadeOutDownActive: {
    opacity: 0,
    transform: 'translateY(100vh)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.easeIn,
    }),
  },
});

const FadeInUpOutDown = ({ classes, theme, ...props }) => (
  <ScreenTransition
    classNames={{
      enter: classes.fadeInUp,
      enterActive: classes.fadeInUpActive,
      exit: classes.fadeOutDown,
      exitActive: classes.fadeOutDownActive,
    }}
    timeout={{
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    }}
    {...props}
  />
);

FadeInUpOutDown.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  theme: themeObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(withTheme()(FadeInUpOutDown));
