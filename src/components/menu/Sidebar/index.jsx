import { ThemeProvider, useTheme } from '@material-ui/core';
import deepmerge from 'deepmerge';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { menuCollapsedSelector } from '../../../ducks/ui';
import List from '../List';

const displayName = 'MenuSidebar';

const MenuSidebar = () => {
  const theme = useTheme();

  const collapsed = useSelector(menuCollapsedSelector);

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
            : {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                transition,

                [theme.breakpoints.up('sm')]: {
                  paddingLeft: theme.spacing(3),
                  paddingRight: theme.spacing(3),
                },
              },
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

MenuSidebar.displayName = displayName;

export default MenuSidebar;
