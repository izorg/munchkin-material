import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.sharp,
      }),
    },

    gutters: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),

      '@supports (padding: max(0px))': {
        paddingLeft: `max(${theme.spacing(2)}px, env(safe-area-inset-left))`,
        paddingRight: `max(${theme.spacing(2)}px, env(safe-area-inset-right))`,
      },

      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),

        '@supports (padding: max(0px))': {
          paddingLeft: `max(${theme.spacing(3)}px, env(safe-area-inset-left))`,
          paddingRight: `max(${theme.spacing(
            3,
          )}px, env(safe-area-inset-right))`,
        },
      },
    },
  }),
  { name: 'TopAppBar' },
);

const TopAppBar = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <AppBar
      classes={{
        root: classes.root,
      }}
      color="primary"
      position="static"
      {...props}
    >
      <Toolbar classes={{ gutters: classes.gutters }}>{children}</Toolbar>
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
