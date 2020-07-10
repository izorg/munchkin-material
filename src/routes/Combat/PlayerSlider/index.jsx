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
import { useDrag } from 'react-use-gesture';

import { setCombatHelper, setCombatHelperBonus } from '../../../ducks/combat';

import Player from './Player';

const displayName = 'CombatPlayerSlider';

const useStyles = makeStyles(
  (theme) => ({
    players: {
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none',
      MsOverflowStyle: 'none',

      '&::-webkit-scrollbar': {
        display: 'none',
      },

      '@media (orientation: portrait)': {
        overflowX: 'auto',
        overflowY: 'hidden',
      },

      '@media (orientation: landscape)': {
        alignSelf: 'center',
        flexDirection: 'column',
        maxHeight: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      },
    },

    container: {
      alignItems: 'flex-start',
      display: 'flex',
    },

    itemContainer: {
      flexShrink: 0,
      width: '100%',

      '@media (orientation: portrait)': {
        padding: theme.spacing(0, 3),

        '& + &': {
          marginLeft: theme.spacing(-4),
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
        marginTop: 8,
      },

      '@media (orientation: landscape)': {
        height: '100%',
      },
    },

    remove: {
      bottom: 0,
      height: 36,
      padding: 6,
      position: 'absolute',
      right: 0,
      width: 36,
    },
  }),
  { name: 'CombatPlayerSlider' },
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

  useEffect(() => {
    if (helperId && helperId !== lastHelperRef.current) {
      const node = ref.current;

      if (landscape) {
        node.scrollTop = node.scrollHeight - node.offsetHeight;
      } else {
        node.scrollLeft =
          direction === 'rtl' ? 0 : node.scrollWidth - node.offsetWidth;
      }

      lastHelperRef.current = helperId;
    }

    if (!helperId) {
      lastHelperRef.current = undefined;
    }
  }, [direction, helperId, landscape]);

  const scrollRef = useRef();

  const bind = useDrag((state) => {
    const { first, event, last, movement } = state;

    if (!event.type.startsWith('mouse')) {
      return;
    }

    const node = ref.current;

    if (first) {
      node.style.scrollBehavior = 'auto';
      scrollRef.current = node.scrollLeft;
    }

    if (last) {
      node.style.scrollBehavior = '';
    }

    node.scrollLeft = scrollRef.current - movement[0] * 1.5;
  });

  return (
    <div ref={ref} className={clsx(classes.players, className)} {...bind()}>
      <div className={classes.container}>
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
      </div>
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
