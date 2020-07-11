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
import { useDrag } from 'react-use-gesture';

import { removeMonster } from '../../../ducks/monsters';

import Monster from './Monster';

const displayName = 'CombatMonsterSlider';

const useStyles = makeStyles(
  (theme) => ({
    monsters: {
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none',
      MsOverflowStyle: 'none',

      '&::-webkit-scrollbar': {
        display: 'none',
      },

      '@media (orientation: portrait)': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflowX: 'auto',
        overflowY: 'hidden',
        paddingBottom: theme.spacing(7),
      },

      '@media (orientation: landscape)': {
        alignSelf: 'center',
        maxHeight: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      },
    },

    container: {
      alignItems: 'flex-end',
      display: 'flex',

      '@media (orientation: landscape)': {
        flexDirection: 'column',
      },
    },

    itemContainer: {
      flexShrink: 0,
      width: '100%',

      '@media (orientation: portrait)': {
        padding: theme.spacing(0, 6),

        '& + &': {
          marginLeft: theme.spacing(-10),
        },
      },

      '@media (orientation: landscape)': {
        padding: theme.spacing(2, 2),
      },
    },

    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',

      [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
        marginBottom: 8,
      },

      '@media (orientation: landscape)': {
        height: '100%',
      },
    },

    remove: {
      position: 'absolute',

      '@media (orientation: portrait)': {
        right: 0,
        top: 0,
      },

      '@media (orientation: landscape)': {
        bottom: 0,
        left: 0,
      },
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

  const monsters = useSelector((state) => state.combat.monsters);

  const monsterCount = useRef(monsters.length);

  useEffect(() => {
    if (monsters.length > monsterCount.current) {
      /**
       * @type {HTMLDivElement}
       */
      const node = ref.current;

      if (landscape) {
        node.scrollTop = node.scrollHeight - node.offsetHeight;
      } else {
        node.scrollLeft =
          direction === 'rtl' ? 0 : node.scrollWidth - node.offsetWidth;
      }
    }

    monsterCount.current = monsters.length;
  }, [direction, landscape, monsters]);

  const handleRemove = (monsterId) => {
    dispatch(removeMonster(monsterId));
  };

  const scrollRef = useRef();

  const bind = useDrag((state) => {
    const { first, event, last, movement } = state;

    if (!event.type.startsWith('mouse')) {
      return;
    }

    const node = ref.current;

    if (first) {
      node.style.scrollBehavior = 'auto';
      scrollRef.current = landscape ? node.scrollTop : node.scrollLeft;
    }

    if (last) {
      node.style.scrollBehavior = '';
    }

    if (landscape) {
      node.scrollTop = scrollRef.current - movement[1] * 1.5;
    } else {
      node.scrollLeft = scrollRef.current - movement[0] * 1.5;
    }
  });

  return (
    <div ref={ref} className={clsx(classes.monsters, className)} {...bind()}>
      <div className={classes.container}>
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
                  style={{
                    width: 36,
                    height: 36,
                    padding: 6,
                  }}
                >
                  <CloseCircle />
                </IconButton>
              )}
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
};

CombatMonsterSlider.displayName = displayName;

export default memo(CombatMonsterSlider);
