import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';

const styles = {
  layoutContent: {
    flex: 1,
  },
};

const LayoutContent = ({ classes, className, ...props }) => (
  <div {...props} className={cns(classes.layoutContent, className)} />
);

export default withStyles(styles)(LayoutContent);
