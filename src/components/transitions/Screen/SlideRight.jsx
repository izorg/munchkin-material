import React from 'react';
import { withStyles, withTheme } from 'material-ui/styles';

import { classesObject, themeObject } from '../../../utils/propTypes';

import ScreenTransition from './ScreenTransition';

const styles = theme => ({
  slideInRight: {
    transform: 'translateX(100vw)',
  },

  slideInRightActive: {
    transform: 'translateX(0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },


  slideOutRight: {
    transform: 'translateX(0)',
  },

  slideOutRightActive: {
    transform: 'translateX(100vw)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.easeIn,
    }),
  },
});

const SlideRight = ({ classes, theme, ...props }) => (
  <ScreenTransition
    classNames={{
      enter: classes.slideInRight,
      enterActive: classes.slideInRightActive,
      exit: classes.slideOutRight,
      exitActive: classes.slideOutRightActive,
    }}
    timeout={{
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    }}
    {...props}
  />
);

SlideRight.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  theme: themeObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(withTheme()(SlideRight));
