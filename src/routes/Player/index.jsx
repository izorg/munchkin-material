import { makeStyles } from '@material-ui/core';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import PlayerContext from '../../components/PlayerContext';

import AppBar from './AppBar';
import CombatButton from './CombatButton';
import PlayerList from './List';
import Slider from './Slider';
import Undo from './Undo';

const displayName = 'Player';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflow: 'hidden',
    },

    content: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflowY: 'auto',

      [theme.breakpoints.up('md')]: {
        flexDirection: 'row-reverse',
      },
    },

    sliderContent: {
      display: 'flex',
      flex: '1 0 auto',

      [theme.breakpoints.up('md')]: {
        flexShrink: 1,
        overflow: 'hidden',
      },
    },

    playerList: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      display: 'none',
      flex: '0 1 auto',
      overflowY: 'auto',
      paddingBottom: theme.spacing(7),

      '@media (min-height: 720px)': {
        display: 'block',
      },

      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing(8),
      },

      [theme.breakpoints.up('md')]: {
        display: 'block',
        flex: 'none',
        paddingBottom: theme.spacing(1),
        width: theme.spacing(50),
      },
    },
  }),
  { name: displayName },
);

const Player = () => {
  const classes = useStyles();
  const playerRef = useRef();
  const playerList = useSelector((state) => state.playerList);

  const { id: playerId } = useParams();

  if (playerId && !playerList.includes(playerId)) {
    return <Redirect to="/" />;
  }

  if (playerId) {
    playerRef.current = playerId;
  }

  if (!playerRef.current) {
    return <Redirect to="/" />;
  }

  return (
    <PlayerContext.Provider value={playerRef.current}>
      <div className={classes.root}>
        <AppBar playerId={playerRef.current} />
        <div className={classes.content}>
          <div className={classes.sliderContent}>
            <Slider playerId={playerRef.current} />
          </div>
          <PlayerList
            className={classes.playerList}
            selectedPlayerId={playerRef.current}
          />
        </div>
      </div>
      <CombatButton playerId={playerRef.current} />
      <Undo />
    </PlayerContext.Provider>
  );
};

Player.defaultProps = {
  match: null,
};

Player.displayName = displayName;

export default Player;
