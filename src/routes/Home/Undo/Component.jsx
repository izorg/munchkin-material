import React from 'react';
import { makeStyles } from '@material-ui/core';

import UndoSnackbar from '../../../components/UndoSnackbar';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      bottom: theme.spacing(11),

      [theme.breakpoints.up('sm')]: {
        bottom: theme.spacing(3.5),
      },
    },
  }),
  { name: 'HomeUndo' },
);

const HomeUndo = (props) => {
  const classes = useStyles();

  return <UndoSnackbar className={classes.root} {...props} />;
};

export default HomeUndo;
