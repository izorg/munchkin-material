import React from 'react';
import PropTypes from 'prop-types';
import MuiAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

const styles = theme => ({
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

const AppBar = ({
  children, classes, className, ...props
}) => (
  <MuiAppBar
    className={cns(className, classes.appBar)}
    {...props}
  >
    <Toolbar disableGutters>
      {children}
    </Toolbar>
  </MuiAppBar>
);

AppBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AppBar.defaultProps = {
  children: null,
  className: '',
};

export default withStyles(styles)(AppBar);
