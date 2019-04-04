import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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

    main: {
      display: 'flex',
      flex: 1,
      overflowY: 'hidden',
    },

    single: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.paper,
    },

    content: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.paper,
      flex: 1,
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

const Home = ({ empty, match, menu, mode, playerCount, singleMode }) => {
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
          <MenuSidebar />
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
  mode: modeType,
  playerCount: PropTypes.number,
  singleMode: PropTypes.bool,
};

Home.defaultProps = {
  empty: false,
  match: null,
  menu: false,
  mode: undefined,
  playerCount: 0,
  singleMode: false,
};

export default Home;
