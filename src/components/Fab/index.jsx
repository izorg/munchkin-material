import React from 'react';
import { Fab, withStyles } from '@material-ui/core';
import cns from 'classnames';

const styles = (theme) => ({
  root: {
    bottom: theme.spacing.unit * 2,
    position: 'fixed',
    right: theme.spacing.unit * 2,
    zIndex: 2,

    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing.unit * 3,
      right: theme.spacing.unit * 3,

      '@supports(padding: max(0px))': {
        right: `max(${theme.spacing.unit * 3}px, env(safe-area-inset-right))`,
      },
    },
  },
});

const FabButton = ({ classes, className, ...rest }) => (
  <Fab className={cns(className, classes.root)} color="primary" {...rest} />
);

export default withStyles(styles)(FabButton);
