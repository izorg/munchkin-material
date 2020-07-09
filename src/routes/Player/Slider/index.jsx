import { makeStyles, useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import PlayerStats from './Stats';

const displayName = 'PlayerSlider';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      overflowX: 'hidden',
      width: '100%',
    },

    container: {
      display: 'flex',
      height: '100%',
    },

    slide: {
      display: 'flex',
    },

    itemContainer: {
      alignItems: 'center',
      display: 'flex',
      flexShrink: 0,
      padding: theme.spacing(2, 2, 7),
      width: '100%',

      '@media (min-height: 720px)': {
        paddingBottom: theme.spacing(2),
      },
    },

    stats: {
      height: '100%',
      margin: [[0, 'auto']],
      maxHeight: 600,
      maxWidth: 600,
    },
  }),
  { name: displayName },
);

const PlayerSlider = ({ playerId: playerIdProp }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { direction } = useTheme();

  const rtl = direction === 'rtl';

  const animateRef = useRef(false);

  const [playerId, setPlayerId] = useState(playerIdProp);

  useEffect(() => {
    if (!animateRef.current) {
      setPlayerId(playerIdProp);
    }
  }, [playerIdProp]);

  const playerList = useSelector((state) => state.playerList);
  const playerCount = playerList.length;

  const currentIndex = playerList.indexOf(playerId);

  const getPlayerIndex = useCallback(
    (index) => {
      let playerIndex = index % playerCount;

      if (playerIndex < 0) {
        playerIndex = playerCount + playerIndex;
      }

      return playerIndex;
    },
    [playerCount],
  );

  const ref = useRef();

  const initialValue = rtl ? 100 : -100;
  const [{ x }, set] = useSpring(() => ({
    x: initialValue,
    config: {
      tension: 300,
      friction: 30,
    },
  }));

  const bind = useDrag(async (state) => {
    const { last, movement, swipe } = state;

    if (animateRef.current === true) {
      return;
    }

    const percent = movement[0] / ref.current.offsetWidth;

    const delta = percent * 100;

    set({
      x: initialValue + delta,
    });

    if (last) {
      if (swipe[0] !== 0 || Math.abs(percent) >= 0.5) {
        let nextPlayerId;
        let value;

        if (swipe[0] === -1 || percent < -0.5) {
          nextPlayerId =
            playerList[getPlayerIndex(currentIndex + (rtl ? -1 : 1))];
          value = rtl ? 0 : -200;
        }

        if (swipe[0] === 1 || percent > 0.5) {
          nextPlayerId =
            playerList[getPlayerIndex(currentIndex - (rtl ? -1 : 1))];
          value = rtl ? 200 : 0;
        }

        animateRef.current = true;
        navigate(`/player/${nextPlayerId}`, {
          replace: true,
        });
        await set({ x: value });
        await set({ x: initialValue, immediate: true });
        animateRef.current = false;

        setPlayerId(nextPlayerId);
      } else {
        await set({ x: initialValue });
      }
    }
  });

  return (
    <div ref={ref} className={classes.root}>
      <animated.div
        key={playerId}
        className={classes.container}
        {...bind()}
        style={{
          transform: x.to((value) => `translateX(${value}%)`),
        }}
      >
        {[currentIndex - 1, currentIndex, currentIndex + 1].map((index) => {
          const playerIndex = getPlayerIndex(index);
          const playerId = playerList[playerIndex];

          return (
            <div key={playerId} className={classes.itemContainer}>
              <PlayerStats className={classes.stats} playerId={playerId} />
            </div>
          );
        })}
      </animated.div>
    </div>
  );
};

PlayerSlider.propTypes = {
  playerId: PropTypes.string.isRequired,
};

PlayerSlider.displayName = displayName;

export default PlayerSlider;
