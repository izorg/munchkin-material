import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard, virtualize } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import { makeStyles, Paper } from '@material-ui/core';
import { noop } from 'lodash/fp';

import PlayerStats from './Stats';

const PlayerSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const useStyles = makeStyles(
  (theme) => ({
    slide: {
      display: 'flex',
    },

    itemContainer: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
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
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: '100%',

      [theme.breakpoints.up('sm')]: {
        backgroundColor: theme.palette.background.paper,
      },
    },

    stats: {
      flex: 1,
    },

    '@media (orientation: portrait)': {
      item: {
        paddingBottom: 56,
      },
    },

    [theme.breakpoints.down('xs')]: {
      item: {
        boxShadow: 'none',
      },
    },

    [theme.breakpoints.up('sm')]: {
      root: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
      },

      itemContainer: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },

      item: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },

      '@media (orientation: portrait)': {
        item: {
          maxHeight: 480,
          paddingBottom: 0,
        },

        stats: {
          maxWidth: 300,
        },
      },

      '@media (orientation: landscape)': {
        item: {
          flex: 'none',
          height: 'auto',
          paddingBottom: theme.spacing(2),
          paddingTop: theme.spacing(2),
        },

        stats: {
          maxWidth: 400,
        },
      },
    },
  }),
  { name: 'PlayerSlider' },
);

const PlayerSlider = ({ initialSlide, onPlayerChange, playerList }) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(initialSlide);

  const getPlayerIndex = (index) => {
    let playerIndex = index % playerList.length;

    if (playerIndex < 0) {
      playerIndex = playerList.length + playerIndex;
    }

    return playerIndex;
  };

  const handleChangeIndex = (index) => {
    const playerIndex = getPlayerIndex(index);

    onPlayerChange(playerList[playerIndex]);

    setCurrentIndex(index);
  };

  // eslint-disable-next-line react/prop-types
  const slideRenderer = ({ key, index }) => {
    const playerIndex = getPlayerIndex(index);
    const playerId = playerList[playerIndex];

    return (
      <div key={key} className={classes.itemContainer}>
        <Paper className={classes.item}>
          <PlayerStats className={classes.stats} playerId={playerId} />
        </Paper>
      </div>
    );
  };

  return (
    <PlayerSwipeableViews
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
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    />
  );
};

PlayerSlider.propTypes = {
  initialSlide: PropTypes.number.isRequired,
  onPlayerChange: PropTypes.func,
  playerList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

PlayerSlider.defaultProps = {
  onPlayerChange: noop,
};

export default PlayerSlider;
