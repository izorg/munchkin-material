import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

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
  <Paper elevation={0} square className={classes.screen} />
);

export default withStyles(styles)(LoadingScreen);
