import { makeStyles, Paper, useTheme } from '@material-ui/core';
import { replace } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { mod } from 'react-swipeable-views-core';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';

import PlayerStats from './Stats';

const PlayerSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const useStyles = makeStyles(
  (theme) => ({
    root: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
      },
    },

    slide: {
      display: 'flex',
    },

    itemContainer: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1, 2),
      },
    },

    item: {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.paper,
      display: 'flex',
      flexGrow: 1,
      height: '100%',
      justifyContent: 'center',
      padding: theme.spacing(2),
      width: '100%',

      '@media (orientation: portrait)': {
        paddingBottom: theme.spacing(7),
      },

      '@media (min-height: 720px)': {
        paddingBottom: theme.spacing(2),
      },

      [theme.breakpoints.up('sm')]: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),

        '@media (orientation: portrait)': {
          maxHeight: 480,
          paddingBottom: theme.spacing(2),
        },

        '@media (orientation: landscape)': {
          flex: 'none',
          height: 'auto',
        },
      },
    },

    stats: {
      flex: 1,

      [theme.breakpoints.up('sm')]: {
        '@media (orientation: portrait)': {
          maxWidth: 300,
        },

        '@media (orientation: landscape)': {
          maxWidth: 400,
        },
      },
    },
  }),
  { name: 'PlayerSlider' },
);

const PlayerSlider = ({ playerId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { direction } = useTheme();

  // const skipNextRef = useRef(false);
  const indexRef = useRef(0);

  const playerList = useSelector((state) => state.playerList);
  const playerCount = playerList.length;

  const currentIndex = useMemo(() => {
    const playerIndex = playerList.indexOf(playerId);

    return indexRef.current - mod(indexRef.current, playerCount) + playerIndex;
  }, [playerCount, playerId, playerList]);

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

  const handleChangeIndex = useCallback(
    (index) => {
      indexRef.current = index;

      dispatch(replace(`/player/${playerList[getPlayerIndex(index)]}`));
    },
    [dispatch, getPlayerIndex, playerList],
  );

  // eslint-disable-next-line react/prop-types
  const slideRenderer = ({ key, index }) => {
    const playerIndex = getPlayerIndex(index);
    const slidePlayerId = playerList[playerIndex];

    return (
      <div key={key} className={classes.itemContainer}>
        <Paper className={classes.item} elevation={0}>
          <PlayerStats className={classes.stats} playerId={slidePlayerId} />
        </Paper>
      </div>
    );
  };

  return (
    <PlayerSwipeableViews
      axis={direction === 'rtl' ? 'x-reverse' : 'x'}
      className={classes.root}
      containerStyle={{
        flex: '1 0 auto',
      }}
      enableMouseEvents
      index={currentIndex}
      onChangeIndex={handleChangeIndex}
      overscanSlideAfter={1}
      overscanSlideBefore={2}
      slideClassName={classes.slide}
      slideRenderer={slideRenderer}
      slideStyle={{
        direction,
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    />
  );
};

PlayerSlider.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default PlayerSlider;
