import React from 'react';
import PropTypes from 'prop-types';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';

const styles = (theme) => ({
  appBar: {
    paddingLeft: 4,
    paddingRight: 4,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.sharp,
    }),

    [theme.breakpoints.up('sm')]: {
      paddingLeft: 12,
      paddingRight: 12,
    },
  },
});

const AppBar = ({ children, classes, className, ...props }) => (
  <MuiAppBar
    className={cns(className, classes.appBar)}
    color="primary"
    position="static"
    {...props}
  >
    <Toolbar disableGutters>{children}</Toolbar>
  </MuiAppBar>
);

AppBar.propTypes = {
  children: PropTypes.node,
};

AppBar.defaultProps = {
  children: null,
};

export default withStyles(styles)(AppBar);
