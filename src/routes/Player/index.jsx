import React, { useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import PlayerContext from '../../components/PlayerContext';
import { matchShape } from '../../utils/propTypes';

import AppBar from './AppBar';
import CombatButton from './CombatButton';
import PlayerList from './List';
import Slider from './Slider';
import Undo from './Undo';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },

    content: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflow: 'hidden',

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
  { name: 'Player' },
);

const Player = ({ match }) => {
  const classes = useStyles();
  const playerRef = useRef();
  const playerList = useSelector((state) => state.playerList);

  const playerId = match && match.params.id;

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

Player.propTypes = {
  match: matchShape,
};

Player.defaultProps = {
  match: null,
};

Player.displayName = 'Player';

export default hot(Player);
