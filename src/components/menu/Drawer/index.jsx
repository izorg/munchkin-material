import {
  makeStyles,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { goBack, push } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { EDIT } from '../../../routes/Home/modes';
import { getQuery, stringifyQuery } from '../../../utils/location';
import { ios } from '../../../utils/platforms';
import MenuList from '../List';
import openSelector from '../openSelector';

const displayName = 'MenuDrawer';

const useStyles = makeStyles(
  () => ({
    paper: {
      maxWidth: 320,
      touchAction: 'pan-y',
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
  const dispatch = useDispatch();
  const theme = useTheme();

  const classes = useStyles();

  const query = useSelector(getQuery);
  const match = useRouteMatch('/');
  const wide = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true,
  });
  const disableSwipeToOpen =
    ios ||
    wide ||
    !match.isExact ||
    !Object.keys(query).every((key) => [EDIT].includes(key));
  const open = useSelector(openSelector);

  const onClose = () => open && dispatch(goBack());

  const onOpen = () =>
    dispatch(
      push({
        search: stringifyQuery({
          ...query,
          menu: null,
        }),
      }),
    );

  return (
    <SwipeableDrawer
      disableSwipeToOpen={disableSwipeToOpen}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      PaperProps={{ className: classes.paper }}
      SwipeAreaProps={{
        className: classes.swipeArea,
      }}
    >
      <MenuList />
    </SwipeableDrawer>
  );
};

MenuDrawer.displayName = displayName;

export default MenuDrawer;
