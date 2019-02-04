import React from 'react';
import { IconButton, withStyles } from '@material-ui/core';
import cns from 'classnames';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 4,
      padding: 8,
    },
  },
});

const TopIconButton = ({ className, classes, ...rest }) => (
  <IconButton className={cns(classes.root, className)} {...rest} />
);

export default withStyles(styles)(TopIconButton);
