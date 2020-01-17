import { ThemeProvider, useTheme } from '@material-ui/core';
import deepmerge from 'deepmerge';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import List from '../List';

const MenuSidebar = () => {
  const theme = useTheme();

  const collapsed = useSelector((state) => state.app.menuCollapsed);

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
    <ThemeProvider theme={sidebarTheme}>
      <List />
    </ThemeProvider>
  );
};

MenuSidebar.displayName = 'MenuSidebar';

export default MenuSidebar;
