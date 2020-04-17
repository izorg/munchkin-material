import { makeStyles, Paper, Zoom } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LevelLimitDialog from '../../components/levelLimit/Dialog';
import MenuDrawer from '../../components/menu/Drawer';
import MenuSidebar from '../../components/menu/Sidebar';
import Nobody from '../../components/Nobody';
import ThemeDialog from '../../components/theme/Dialog';

import AppBar from './AppBar';
import PlayerAddButton from './PlayerAddButton';
import PlayerList from './PlayerList';
import SinglePlayer from './SinglePlayer';
import Undo from './Undo';

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
      height: '100%',
      overflowY: 'auto',
      paddingBottom: 48,
      touchAction: 'pan-y',
      WebkitOverflowScrolling: 'touch',

      [theme.breakpoints.up('sm')]: {
        backgroundColor: 'transparent',
        paddingBottom: 0,
      },
    },

    list: {
      [theme.breakpoints.up('sm')]: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        margin: '0 auto',
        width: 400,
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
  const { mode } = useParams();

  if (singleMode) {
    content = <SinglePlayer />;
  } else if (empty) {
    content = <Nobody />;
  } else {
    content = (
      <div ref={contentRef} className={classes.content}>
        <PlayerList className={classes.list} mode={mode} />
      </div>
    );
  }

  const menuCollapsed = useSelector((state) => state.app.menuCollapsed);

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

      <Zoom appear={false} in={!mode && !singleMode}>
        <PlayerAddButton />
      </Zoom>

      <MenuDrawer />
      <LevelLimitDialog />
      <ThemeDialog />

      <Undo />
    </>
  );
};

Home.displayName = displayName;

export default Home;
