import React from 'react';
import { withStyles } from '@material-ui/core';

import UndoSnackbar from '../../../components/UndoSnackbar';

const styles = (theme) => ({
  [theme.breakpoints.down('sm')]: {
    root: {
      bottom: theme.spacing(11),
    },
  },

  [theme.breakpoints.down('xs')]: {
    root: {
      bottom: theme.spacing(10),
    },
  },
});

const Undo = ({ classes, ...rest }) => (
  <UndoSnackbar className={classes.root} {...rest} />
);

export default withStyles(styles)(Undo);
