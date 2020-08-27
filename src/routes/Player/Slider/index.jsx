import { makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PlayerStats from './Stats';

const displayName = 'PlayerSlider';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      overflowX: 'hidden',
      width: '100%',
    },

    container: {
      height: '100%',
      position: 'relative',
    },

    slide: {
      display: 'flex',
    },

    itemContainer: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      padding: theme.spacing(2, 2, 7),
      width: '100%',

      '@media (min-height: 720px)': {
        paddingBottom: theme.spacing(2),
      },
    },

    previousItemContainer: {
      left: '-100%',
      position: 'absolute',
      top: 0,
    },

    nextItemContainer: {
      left: '100%',
      position: 'absolute',
      top: 0,
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

const PlayerSlider = ({ playerId }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { direction } = useTheme();

  const rtl = direction === 'rtl';

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

  /**
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
  const ref = useRef();

  const controls = useAnimation();

  const onDragEnd = async (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let direction = 0;

    if (Math.abs(velocity) >= 500) {
      direction = velocity > 0 ? 1 : -1;
    } else if (Math.abs(offset) >= ref.current.offsetWidth / 2) {
      direction = offset > 0 ? 1 : -1;
    }

    if (direction) {
      const playerDirection = rtl ? direction : -direction;

      const nextPlayerId =
        playerList[getPlayerIndex(currentIndex + playerDirection)];

      navigate(`/player/${nextPlayerId}`, {
        replace: true,
      });

      controls.set({
        x: ref.current.offsetWidth * -direction + offset,
      });

      await controls.start(
        {
          x: 0,
        },
        {
          mass: 0.1,
          type: 'spring',
          velocity,
        },
      );
    }
  };

  return (
    <div ref={ref} className={classes.root}>
      <motion.div
        key={playerId}
        animate={controls}
        className={classes.container}
        drag={playerList.length > 1 ? 'x' : false}
        dragConstraints={ref}
        dragElastic={1}
        onDragEnd={onDragEnd}
      >
        {[currentIndex - 1, currentIndex, currentIndex + 1].map((index) => {
          const playerIndex = getPlayerIndex(index);
          const playerId = playerList[playerIndex];

          return (
            <div
              key={`${playerId}-${index}`}
              className={clsx(
                classes.itemContainer,
                index === currentIndex - 1 && classes.previousItemContainer,
                index === currentIndex + 1 && classes.nextItemContainer,
              )}
            >
              <PlayerStats className={classes.stats} playerId={playerId} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

PlayerSlider.propTypes = {
  playerId: PropTypes.string.isRequired,
};

PlayerSlider.displayName = displayName;

export default PlayerSlider;
