import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const displayName = 'Loading';

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
  { name: displayName },
);

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
};

Loading.displayName = displayName;

export default Loading;
