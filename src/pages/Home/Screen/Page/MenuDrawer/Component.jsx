import React from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  menu: {
    width: 'calc(100vw - 56px)',

    [theme.breakpoints.up('sm')]: {
      width: 280,
    },
  },
});

const Component = ({ classes, ...props }) => (
  <Drawer {...props}>
    <div className={classes.menu}>Works</div>
  </Drawer>
);

export default withStyles(styles)(Component);
