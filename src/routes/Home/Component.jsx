import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Zoom } from '@material-ui/core';
import clsx from 'clsx';

import LevelLimitDialog from '../../components/LevelLimitDialog';
import MenuDrawer from '../../components/menu/Drawer';
import MenuSidebar from '../../components/menu/Sidebar';
import Nobody from '../../components/Nobody';
import ThemeDialog from '../../components/ThemeDialog';

import modeType from './modeType';

import AppBar from './AppBar';
import PlayerAddButton from './PlayerAddButton';
import PlayerList from './PlayerList';
import SinglePlayer from './SinglePlayer';
import Undo from './Undo';

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
  { name: 'Home' },
);

const Home = ({
  empty,
  match,
  menu,
  menuCollapsed,
  mode,
  playerCount,
  singleMode,
}) => {
  const contentRef = useRef();
  const playerCountRef = useRef(playerCount);

  const classes = useStyles();

  useEffect(() => {
    const node = contentRef.current;

    if (playerCount > playerCountRef.current) {
      node.scrollTop = node.scrollHeight;
    }

    playerCountRef.current = playerCount;
  }, [playerCount]);

  let content;

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

  return (
    <>
      <div className={clsx(classes.root, { [classes.single]: singleMode })}>
        <AppBar mode={mode} singleMode={singleMode} />
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

      <Zoom appear={false} in={Boolean(match) && !mode && !singleMode}>
        <PlayerAddButton />
      </Zoom>

      {menu && <MenuDrawer />}
      <LevelLimitDialog />
      <ThemeDialog />

      <Undo />
    </>
  );
};

Home.propTypes = {
  empty: PropTypes.bool,
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  menu: PropTypes.bool,
  menuCollapsed: PropTypes.bool,
  mode: modeType,
  playerCount: PropTypes.number,
  singleMode: PropTypes.bool,
};

Home.defaultProps = {
  empty: false,
  match: null,
  menu: false,
  menuCollapsed: true,
  mode: undefined,
  playerCount: 0,
  singleMode: false,
};

export default Home;
