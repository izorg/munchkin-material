import { makeStyles, Paper, Zoom } from '@material-ui/core';
import clsx from 'clsx';
import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

import LevelLimitDialog from '../../components/levelLimit/Dialog';
import MenuDrawer from '../../components/menu/Drawer';
import MenuSidebar from '../../components/menu/Sidebar';
import Nobody from '../../components/Nobody';
import ScreenModal from '../../components/ScreenModal';
import ThemeDialog from '../../components/theme/Dialog';
import { menuCollapsedSelector } from '../../ducks/ui';

import AppBar from './AppBar';
import PlayerAddButton from './PlayerAddButton';
import PlayerList from './PlayerList';
import SinglePlayer from './SinglePlayer';
import Undo from './Undo';

const Player = lazy(() =>
  import(
    /* webpackChunkName: "player" */
    /* webpackPrefetch: true */
    '../Player'
  ),
);

const displayName = 'Home';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },

    single: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.paper,
    },

    main: {
      display: 'flex',
      flex: 1,
      height: '100%',
      overflow: 'hidden',
    },

    menu: {
      display: 'none',
      overflowX: 'hidden',
      padding: 0,
      transition: theme.transitions.create(['padding', 'width'], {
        duration: theme.transitions.duration.short,
      }),
      width: theme.spacing(40),
      zIndex: 1,

      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },

    menuCollapsed: {
      padding: theme.spacing(0, 1),
      width: theme.spacing(9),
    },

    content: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.paper,
      flex: 1,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
    },

    list: {
      paddingBottom: 56,

      [theme.breakpoints.up('sm')]: {
        paddingBottom: 64,
      },
    },
  }),
  { name: displayName },
);

const Home = () => {
  const contentRef = useRef();

  const classes = useStyles();

  const playerList = useSelector((state) => state.playerList);
  const playerCount = playerList.length;
  const empty = playerCount === 0;

  const playerCountRef = useRef(playerCount);

  useEffect(() => {
    const node = contentRef.current;

    if (playerCount > playerCountRef.current) {
      node.scrollTop = node.scrollHeight;
    }

    playerCountRef.current = playerCount;
  }, [playerCount]);

  let content;

  const singleMode = useSelector((state) => state.app.singleMode);

  if (singleMode) {
    content = <SinglePlayer />;
  } else if (empty) {
    content = <Nobody />;
  } else {
    content = (
      <div ref={contentRef} className={classes.content}>
        <PlayerList className={classes.list} />
      </div>
    );
  }

  const menuCollapsed = useSelector(menuCollapsedSelector);

  const playerMatch = useMatch({
    path: '/player/:id',
    end: false,
  });

  return (
    <>
      <div className={clsx(classes.root, { [classes.single]: singleMode })}>
        <AppBar empty={empty} singleMode={singleMode} />
        <main className={classes.main}>
          <Paper
            className={clsx(
              classes.menu,
              menuCollapsed && classes.menuCollapsed,
            )}
            data-screenshot="sidebar-menu"
            square
          >
            <MenuSidebar />
          </Paper>
          {content}
        </main>
      </div>

      <Zoom appear={false} in={!singleMode}>
        <PlayerAddButton />
      </Zoom>

      <MenuDrawer />
      <LevelLimitDialog />
      <ThemeDialog />

      <Undo />

      <ScreenModal open={Boolean(playerMatch)}>
        <Suspense fallback={null}>
          <Player playerId={playerMatch?.params.id} />
        </Suspense>
      </ScreenModal>
    </>
  );
};

Home.displayName = displayName;

export default Home;
