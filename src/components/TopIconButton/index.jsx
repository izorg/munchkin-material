import React from 'react';
import { IconButton, withStyles } from '@material-ui/core';
import clsx from 'clsx';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 4,
      padding: 8,
    },
  },
});

const TopIconButton = ({ className, classes, ...rest }) => (
  <IconButton className={clsx(classes.root, className)} {...rest} />
);

export default withStyles(styles)(TopIconButton);
