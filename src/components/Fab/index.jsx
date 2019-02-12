import React from 'react';
import { Fab, withStyles } from '@material-ui/core';
import clsx from 'clsx';

const styles = (theme) => ({
  root: {
    bottom: theme.spacing(2),
    position: 'fixed',
    right: theme.spacing(2),
    zIndex: 2,

    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(3),
      right: theme.spacing(3),

      '@supports(padding: max(0px))': {
        right: `max(${theme.spacing(3)}px, env(safe-area-inset-right))`,
      },
    },
  },
});

const FabButton = ({ classes, className, ...rest }) => (
  <Fab className={clsx(className, classes.root)} color="primary" {...rest} />
);

export default withStyles(styles)(FabButton);
