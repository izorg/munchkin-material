import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
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
    variant="title"
    {...props}
  />
);

export default withStyles(styles)(Title);
