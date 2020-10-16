import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { lazy, Suspense, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useMatch } from 'react-router-dom';

import PlayerContext from '../../components/PlayerContext';
import ScreenModal from '../../components/ScreenModal';

import AppBar from './AppBar';
import CombatButton from './CombatButton';
import PlayerList from './List';
import Slider from './Slider';

const Combat = lazy(() =>
  import(
    /* webpackChunkName: "combat" */
    /* webpackPrefetch: true */
    '../Combat'
  ),
);

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

const Player = ({ playerId }) => {
  const classes = useStyles();
  const playerRef = useRef();
  const playerList = useSelector((state) => state.present.playerList);

  const combatMatch = useMatch({
    path: '/player/:id/combat',
    end: false,
  });

  if (playerId && !playerList.includes(playerId)) {
    return <Navigate to="/" />;
  }

  if (playerId) {
    playerRef.current = playerId;
  }

  if (!playerRef.current) {
    return <Navigate to="/" />;
  }

  return (
    <PlayerContext.Provider value={playerRef.current}>
      <div className={classes.root}>
        <AppBar playerId={playerRef.current} />
        <div className={classes.content}>
          <div className={classes.sliderContent}>
            <Slider playerId={playerRef.current} />
          </div>
          {playerList.length > 1 && (
            <PlayerList
              className={classes.playerList}
              selectedPlayerId={playerRef.current}
            />
          )}
        </div>
      </div>
      <CombatButton playerId={playerRef.current} />

      <ScreenModal open={Boolean(combatMatch)}>
        <Suspense fallback={null}>
          <Combat />
        </Suspense>
      </ScreenModal>
    </PlayerContext.Provider>
  );
};

Player.propTypes = {
  playerId: PropTypes.string,
};

Player.defaultProps = {
  playerId: null,
};

Player.displayName = displayName;

export default Player;
