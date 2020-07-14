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
import React, { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import { setCombatHelper, setCombatHelperBonus } from '../../../ducks/combat';

import Player from './Player';

const displayName = 'CombatPlayerSlider';

const useStyles = makeStyles(
  (theme) => ({
    players: {
      overflow: 'hidden',

      '@media (orientation: portrait)': {
        maxWidth: '100%',
      },

      '@media (orientation: landscape)': {
        maxHeight: '100%',
      },
    },

    container: {
      display: 'flex',

      '@media (orientation: landscape)': {
        flexDirection: 'column',
      },
    },

    itemContainer: {
      flexShrink: 0,

      '@media (orientation: portrait)': {
        padding: theme.spacing(1, 2),

        '& + &': {
          paddingLeft: 0,
        },
      },

      '@media (orientation: landscape)': {
        padding: theme.spacing(2, 1),

        '& + &': {
          paddingTop: 0,
        },
      },
    },

    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: 'auto',
      position: 'relative',

      '@media (orientation: portrait)': {
        width: 280,
      },

      '@media (orientation: landscape)': {
        maxWidth: 320,
      },
    },

    remove: {
      position: 'absolute',
      right: 0,
      top: 0,
    },
  }),
  { name: displayName },
);

const CombatPlayerSlider = ({ className, helperId, playerId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ref = useRef();
  const lastHelperRef = useRef(helperId);
  const { direction } = useTheme();

  const landscape = useMediaQuery('(orientation: landscape)', {
    noSsr: true,
  });

  const handleHelperRemove = () => {
    dispatch(setCombatHelper(null));
    dispatch(setCombatHelperBonus(0));
  };

  const startRef = useRef({ x: 0, y: 0 });

  const [{ x, y }, set] = useSpring(() => ({
    ...startRef.current,
    config: {
      tension: 1000,
      friction: 50,
    },
  }));

  const bind = useDrag(async (state) => {
    const { first, movement } = state;

    if (first) {
      startRef.current = { x: x.get(), y: y.get() };
    }

    let value =
      startRef.current[landscape ? 'y' : 'x'] +
      movement[landscape ? 1 : 0] * 1.2;

    /**
     * @type {HTMLDivElement}
     */
    const node = ref.current;

    const max =
      direction === 'rtl' ? node.scrollWidth - node.parentNode.offsetWidth : 0;
    const min = landscape
      ? -node.scrollHeight + node.parentNode.offsetHeight
      : direction === 'rtl'
      ? 0
      : -node.scrollWidth + node.parentNode.offsetWidth;

    if (value > max) {
      value = max;
    }

    if (value < min) {
      value = min;
    }

    await set({
      [landscape ? 'y' : 'x']: value,
    });
  });

  useEffect(() => {
    set({ [landscape ? 'x' : 'y']: 0, immediate: true });
  }, [landscape, set]);

  useEffect(() => {
    set({ x: 0, immediate: true });
  }, [direction, set]);

  useEffect(() => {
    /**
     * @type {HTMLDivElement}
     */
    const node = ref.current;

    const max =
      direction === 'rtl' ? node.scrollWidth - node.parentNode.offsetWidth : 0;
    const min = landscape
      ? -node.scrollHeight + node.parentNode.offsetHeight
      : direction === 'rtl'
      ? 0
      : -node.scrollWidth + node.parentNode.offsetWidth;

    if (helperId && !lastHelperRef.current) {
      if (landscape) {
        set({
          y: min,
        });
      } else {
        set({
          x: direction === 'rtl' ? max : min,
        });
      }
    }

    if (!helperId && lastHelperRef.current) {
      if (landscape) {
        if (y.get() < min) {
          set({ y: min });
        }
      } else {
        if (direction === 'ltr' && x.get() < min) {
          set({ x: min });
        }

        if (direction === 'rtl' && x.get() > max) {
          set({ x: max });
        }
      }
    }

    lastHelperRef.current = helperId;
  }, [direction, helperId, landscape, set, x, y]);

  return (
    <div
      className={clsx(classes.players, className)}
      touch-action="none"
      {...bind()}
    >
      <animated.div ref={ref} className={classes.container} style={{ x, y }}>
        <div className={classes.itemContainer}>
          <Paper className={classes.paper}>
            <Player playerId={playerId} />
          </Paper>
        </div>
        {helperId && (
          <div className={classes.itemContainer}>
            <Paper key={helperId} className={classes.paper}>
              <Player playerId={helperId} />

              <IconButton
                className={classes.remove}
                onClick={handleHelperRemove}
              >
                <CloseCircle />
              </IconButton>
            </Paper>
          </div>
        )}
      </animated.div>
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
