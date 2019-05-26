import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(
  (theme) => ({
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

        '@supports (padding: max(0px))': {
          paddingLeft: 'max(12px, env(safe-area-inset-left) - 12px)',
          paddingRight: 'max(12px, env(safe-area-inset-right) - 12px)',
        },
      },
    },
  }),
  { name: 'TopAppBar' },
);

const TopAppBar = ({ children, className, ...props }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(className, classes.appBar)}
      color="primary"
      position="static"
      {...props}
    >
      <Toolbar disableGutters>{children}</Toolbar>
    </AppBar>
  );
};

TopAppBar.propTypes = {
  children: PropTypes.node,
};

TopAppBar.defaultProps = {
  children: null,
};

export default TopAppBar;
