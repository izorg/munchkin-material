import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
  {
    loading: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
  },
  { name: 'Loading' },
);

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
