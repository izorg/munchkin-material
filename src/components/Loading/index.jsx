import React from 'react';
import { CircularProgress, withStyles } from '@material-ui/core';

const styles = {
  loading: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
};

const Loading = ({ classes }) => (
  <div className={classes.loading}>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(Loading);
