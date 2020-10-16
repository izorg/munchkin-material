import { IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import Counter, { counterMessages } from '../../../../components/Counter';
import CounterLabel from '../../../../components/Counter/Label';
import Sex from '../../../../components/Sex';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from '../../../../ducks/players';
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from '../../../../utils/levelLimit';

const displayName = 'PlayerStats';

const useStyles = makeStyles(
  (theme) => ({
    stats: {
      display: 'flex',
      flexDirection: 'column-reverse',
      width: '100%',
    },

    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      justifyContent: 'center',
    },

    counters: {
      flex: '1',
      display: 'flex',
    },

    counterContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 50%',
      justifyContent: 'center',
    },

    strengthCounter: {
      textAlign: 'center',
    },

    strengthTitle: {
      fontSize: 24,
    },

    strengthValue: {
      color: theme.palette.text.primary,
      fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
      fontSize: 36,

      '@media (orientation: portrait)': {
        fontSize: 72, // 36px * 2
        lineHeight: theme.typography.body2.lineHeight / 2, // 1.43 / 2
        marginTop: 32,
      },
    },

    sex: {
      fontSize: 32,
      padding: 8,

      '@media (orientation: portrait)': {
        marginTop: 16,
      },
    },

    sexIcon: {
      fontSize: 'inherit',
    },

    '@media (orientation: landscape)': {
      stats: {
        flexDirection: 'row',
      },

      counters: {
        flex: 2,
      },
    },
  }),
  { name: displayName },
);

const PlayerStats = ({ className, playerId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const player = useSelector((state) => state.present.players[playerId]);
  const levelLimit = useSelector((state) => state.present.settings.levelLimit);
  const epic = useSelector((state) => state.present.settings.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(
    player.level,
    levelLimit,
  );

  const levelIncrementDisabled = isLevelIncrementDisabled(
    player.level,
    levelLimit,
    epic,
  );

  const onGearDecrement = useCallback(
    () => dispatch(decrementPlayerGear(playerId)),
    [dispatch, playerId],
  );
  const onGearIncrement = useCallback(
    () => dispatch(incrementPlayerGear(playerId)),
    [dispatch, playerId],
  );
  const onLevelDecrement = useCallback(
    () => dispatch(decrementPlayerLevel(playerId)),
    [dispatch, playerId],
  );
  const onLevelIncrement = useCallback(
    () => dispatch(incrementPlayerLevel(playerId)),
    [dispatch, playerId],
  );
  const onSexToggle = useCallback(() => dispatch(togglePlayerSex(playerId)), [
    dispatch,
    playerId,
  ]);

  return (
    <div className={clsx(className, classes.stats)}>
      <div className={classes.counters}>
        <div className={classes.counterContainer}>
          <Counter
            decrementDisabled={levelDecrementDisabled}
            incrementDisabled={levelIncrementDisabled}
            onDecrement={onLevelDecrement}
            onIncrement={onLevelIncrement}
            title={intl.formatMessage(counterMessages.level)}
            value={player.level}
          />
        </div>
        <div className={classes.counterContainer}>
          <Counter
            onDecrement={onGearDecrement}
            onIncrement={onGearIncrement}
            title={intl.formatMessage(counterMessages.gear)}
            value={player.gear}
          />
        </div>
      </div>
      <div className={classes.mainContainer}>
        <div className={classes.strengthCounter}>
          <CounterLabel className={classes.strengthTitle}>
            {intl.formatMessage(counterMessages.strength)}
          </CounterLabel>

          <div className={classes.strengthValue}>
            {player.level + player.gear}
          </div>

          <IconButton
            className={classes.sex}
            onClick={() => onSexToggle(player.id)}
          >
            <Sex className={classes.sexIcon} sex={player.sex} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

PlayerStats.propTypes = {
  playerId: PropTypes.string.isRequired,
};

PlayerStats.displayName = displayName;

export default PlayerStats;
