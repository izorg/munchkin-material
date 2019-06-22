import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import deepmerge from 'deepmerge';

import List from '../List';

const MenuSidebar = ({ collapsed }) => {
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
    <MuiThemeProvider theme={sidebarTheme}>
      <List />
    </MuiThemeProvider>
  );
};

MenuSidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

MenuSidebar.displayName = 'MenuSidebar';

export default MenuSidebar;
