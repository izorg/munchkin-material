import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';

export { default as LayoutContent } from './Content';

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
};

const Layout = ({ classes, className, ...props }) => (
  <Paper
    className={cns(classes.layout, className)}
    elevation={0}
    square
    {...props}
  />
);

export default withStyles(styles)(Layout);
