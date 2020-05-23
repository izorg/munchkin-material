import {
  makeStyles,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { EDIT } from '../../../routes/Home/modes';
import { stringifyQuery, useLocationQuery } from '../../../utils/location';
import { ios } from '../../../utils/platforms';
import MenuList from '../List';
import useMenuOpen from '../useMenuOpen';

const displayName = 'MenuDrawer';

const useStyles = makeStyles(
  () => ({
    paper: {
      maxWidth: 320,
      width: 'calc(100% - 56px)', // use % instead of vw for Android 4.4

      '@supports (padding: env(safe-area-inset-left))': {
        maxWidth: 'calc(320px + env(safe-area-inset-left))',
        paddingLeft: 'env(safe-area-inset-left)',
      },
    },
  }),
  { name: displayName },
);

const MenuDrawer = () => {
  const history = useHistory();
  const theme = useTheme();

  const classes = useStyles();

  const query = useLocationQuery();
  const match = useRouteMatch('/');
  const wide = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true,
  });
  const disableSwipeToOpen =
    ios ||
    wide ||
    !match.isExact ||
    !Object.keys(query).every((key) => [EDIT].includes(key));
  const open = useMenuOpen();

  const onClose = () => open && history.goBack();

  const onOpen = () =>
    history.push({
      search: stringifyQuery({
        ...query,
        menu: null,
      }),
    });

  return (
    <SwipeableDrawer
      disableSwipeToOpen={disableSwipeToOpen}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      PaperProps={{ className: classes.paper }}
    >
      <MenuList />
    </SwipeableDrawer>
  );
};

MenuDrawer.displayName = displayName;

export default MenuDrawer;
