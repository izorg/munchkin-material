import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, MuiThemeProvider, Paper } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import deepmerge from 'deepmerge';

import List from '../List';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: 'none',
    overflowX: 'hidden',
    padding: 0,
    transition: theme.transitions.create(['padding', 'width'], {
      duration: theme.transitions.duration.short,
    }),
    width: theme.spacing(40),

    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },

  collapsed: {
    padding: theme.spacing(0, 1),
    width: theme.spacing(9),
  },
}));

const MenuSidebar = ({ className, collapsed }) => {
  const classes = useStyles();
  const theme = useTheme();

  const sidebarTheme = useMemo(() => {
    const transition = theme.transitions.create(['border-radius', 'padding'], {
      duration: theme.transitions.duration.short,
    });

    return deepmerge(theme, {
      overrides: {
        MenuListItem: {
          gutters: collapsed
            ? {
                borderRadius: theme.shape.borderRadius,
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                transition,
              }
            : theme.mixins.gutters({ transition }),
        },
      },
    });
  }, [collapsed, theme]);

  return (
    <Paper
      className={clsx(
        classes.sidebar,
        collapsed && classes.collapsed,
        className,
      )}
      data-screenshot="sidebar-menu"
    >
      <MuiThemeProvider theme={sidebarTheme}>
        <List />
      </MuiThemeProvider>
    </Paper>
  );
};

MenuSidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

export default MenuSidebar;
