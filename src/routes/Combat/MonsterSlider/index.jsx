import {
  IconButton,
  makeStyles,
  Paper,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { CloseCircle } from 'mdi-material-ui';
import React, { memo, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import { removeMonster } from '../../../ducks/monsters';

import Monster from './Monster';

const displayName = 'CombatMonsterSlider';

const useStyles = makeStyles(
  (theme) => ({
    monsters: {
      overflow: 'hidden',
      touchAction: 'none',

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
      position: 'relative',

      '@media (orientation: portrait)': {
        width: 280,
      },

      '@media (orientation: landscape)': {
        maxWidth: 280,
      },
    },

    remove: {
      height: 36,
      padding: 6,
      position: 'absolute',
      right: 0,
      top: 0,
      width: 36,
    },
  }),
  { name: displayName },
);

const CombatMonsterSlider = ({ className }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ref = useRef();
  const { direction } = useTheme();

  const landscape = useMediaQuery('(orientation: landscape)', {
    noSsr: true,
  });

  const handleRemove = (monsterId) => {
    dispatch(removeMonster(monsterId));
  };

  const startRef = useRef({ x: 0, y: 0 });

  const [{ x, y }, set] = useSpring(() => ({
    ...startRef.current,
    config: {
      tension: 1000,
      friction: 50,
    },
    filterTaps: true,
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

  const monsters = useSelector((state) => state.combat.monsters);

  const monsterCount = useRef(monsters.length);

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

    if (monsters.length > monsterCount.current) {
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

    if (monsters.length < monsterCount.current) {
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

    monsterCount.current = monsters.length;
  }, [direction, landscape, monsters.length, set, x, y]);

  return (
    <div
      className={clsx(classes.monsters, className)}
      touch-action="none"
      {...bind()}
    >
      <animated.div ref={ref} className={classes.container} style={{ x, y }}>
        {monsters.map((id, monsterIndex) => (
          <div key={id} className={classes.itemContainer}>
            <Paper className={classes.paper}>
              <Monster
                monsterId={id}
                title={
                  <FormattedMessage
                    defaultMessage="Monster {number}"
                    id="combat.monster"
                    values={{
                      number: monsterIndex + 1,
                    }}
                  />
                }
              />

              {monsters.length > 1 && (
                <IconButton
                  className={classes.remove}
                  onClick={() => handleRemove(id)}
                >
                  <CloseCircle />
                </IconButton>
              )}
            </Paper>
          </div>
        ))}
      </animated.div>
    </div>
  );
};

CombatMonsterSlider.displayName = displayName;

export default memo(CombatMonsterSlider);
