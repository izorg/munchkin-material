import React from 'react';
import { withStyles } from '@material-ui/core';

import UndoSnackbar from '../../../components/UndoSnackbar';

const styles = (theme) => ({
  root: {
    bottom: theme.spacing(11),

    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(3.5),
    },
  },
});

const Undo = ({ classes, ...rest }) => (
  <UndoSnackbar className={classes.root} {...rest} />
);

export default withStyles(styles)(Undo);
