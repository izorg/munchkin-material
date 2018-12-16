import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import cns from 'classnames';

const styles = {
  title: {
    flex: 1,
  },
};

const Title = ({ className, classes, ...props }) => (
  <Typography
    className={cns(classes.title, className)}
    color="inherit"
    noWrap
    variant="h6"
    {...props}
  />
);

export default withStyles(styles)(Title);
