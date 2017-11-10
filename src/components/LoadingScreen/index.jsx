import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../../utils/propTypes';

const styles = {
  screen: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
};

const LoadingScreen = ({ classes }) => (
  <Paper
    elevation={0}
    square
    className={classes.screen}
  />
);

LoadingScreen.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(LoadingScreen);
