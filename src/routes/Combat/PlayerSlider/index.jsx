import {
  IconButton,
  makeStyles,
  Paper,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { CloseCircle } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import { setCombatHelper, setCombatHelperBonus } from '../../../ducks/combat';

import Player from './Player';

const displayName = 'CombatPlayerSlider';

const useStyles = makeStyles(
  (theme) => ({
    players: {
      alignItems: 'flex-start',
      display: 'flex',
      position: 'relative',
    },

    remove: {
      bottom: 8,
      height: 36,
      padding: 6,
      position: 'absolute',
      right: 8,
      width: 36,
    },

    [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
      paper: {
        marginTop: 8,
      },
    },

    '@media (orientation: landscape)': {
      players: {
        alignItems: 'center',
        overflow: 'hidden',
      },
    },
  }),
  { name: 'CombatPlayerSlider' },
);

const CombatPlayerSlider = ({ className, helperId, playerId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { direction } = useTheme();

  const portrait = useMediaQuery('(orientation: portrait)', {
    noSsr: true,
  });

  const initialRender = useRef(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!initialRender.current && helperId) {
      setCurrentIndex(1);
    }

    initialRender.current = false;
  }, [helperId]);

  const onChangeIndex = (index) => {
    setCurrentIndex(index);
  };

  const players = [
    <Paper key={playerId} className={classes.paper}>
      <Player playerId={playerId} />
    </Paper>,
  ];

  if (helperId) {
    const handleHelperRemove = () => {
      setCurrentIndex(0);

      dispatch(setCombatHelper(null));
      dispatch(setCombatHelperBonus(0));
    };

    players.push(
      <Paper key={helperId} className={classes.paper}>
        <Player playerId={helperId} />

        <IconButton className={classes.remove} onClick={handleHelperRemove}>
          <CloseCircle />
        </IconButton>
      </Paper>,
    );
  }

  return (
    <div className={clsx(classes.players, className)}>
      {portrait ? (
        <SwipeableViews
          axis={direction === 'rtl' ? 'x-reverse' : 'x'}
          enableMouseEvents
          index={currentIndex}
          onChangeIndex={onChangeIndex}
          slideStyle={{
            direction,
            padding: '0 8px 8px',
            position: 'relative',
          }}
          style={{
            flex: 1,
            padding: '0 32px',
          }}
        >
          {players}
        </SwipeableViews>
      ) : (
        <SwipeableViews
          axis="y"
          containerStyle={{
            height: 224, // real phone counter value round float
            width: '100%',
          }}
          enableMouseEvents
          ignoreNativeScroll
          index={currentIndex}
          onChangeIndex={onChangeIndex}
          slideStyle={{
            direction,
            height: 224,
            padding:
              direction === 'rtl' ? '8px 24px 8px 8px' : '8px 8px 8px 24px',
            position: 'relative',
          }}
          style={{
            alignItems: 'center',
            display: 'flex',
            overflowY: 'visible',
            width: '100%',
          }}
        >
          {players}
        </SwipeableViews>
      )}
    </div>
  );
};

CombatPlayerSlider.propTypes = {
  helperId: PropTypes.string,
  playerId: PropTypes.string.isRequired,
};

CombatPlayerSlider.defaultProps = {
  helperId: null,
};

CombatPlayerSlider.displayName = displayName;

export default memo(CombatPlayerSlider);
