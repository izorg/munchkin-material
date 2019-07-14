import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { noop } from 'lodash/fp';

import Counter from '../../../../components/Counter';
import CounterLabel from '../../../../components/Counter/Label';
import Sex from '../../../../components/Sex';
import { playerShape } from '../../../../utils/propTypes';

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
      fontSize: 72, // 36px * 2
      lineHeight: theme.typography.body2.lineHeight / 2, // 1.43 / 2
      marginTop: 32,
    },

    sex: {
      fontSize: 36,
      height: 64,
      padding: 12,
      width: 64,
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

      strengthValue: {
        marginTop: 64,
      },
    },
  }),
  { name: 'PlayerStats' },
);

const PlayerStats = ({
  className,
  levelDecrementDisabled,
  levelIncrementDisabled,
  onGearDecrement,
  onGearIncrement,
  onLevelDecrement,
  onLevelIncrement,
  onSexToggle,
  player,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.stats)}>
      <div className={classes.counters}>
        <div className={classes.counterContainer}>
          <Counter
            decrementDisabled={levelDecrementDisabled}
            incrementDisabled={levelIncrementDisabled}
            onDecrement={() => onLevelDecrement(player.id)}
            onIncrement={() => onLevelIncrement(player.id)}
            title={
              <FormattedMessage
                defaultMessage="Level"
                id="player.stats.level"
              />
            }
            value={player.level}
          />
        </div>
        <div className={classes.counterContainer}>
          <Counter
            onDecrement={() => onGearDecrement(player.id)}
            onIncrement={() => onGearIncrement(player.id)}
            title={
              <FormattedMessage defaultMessage="Gear" id="player.stats.gear" />
            }
            value={player.gear}
          />
        </div>
      </div>
      <div className={classes.mainContainer}>
        <div className={classes.strengthCounter}>
          <CounterLabel className={classes.strengthTitle}>
            <FormattedMessage
              defaultMessage="Strength"
              id="player.stats.strength"
            />
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
  levelDecrementDisabled: PropTypes.bool,
  levelIncrementDisabled: PropTypes.bool,
  onGearDecrement: PropTypes.func,
  onGearIncrement: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  onSexToggle: PropTypes.func,
  player: playerShape.isRequired,
};

PlayerStats.defaultProps = {
  levelDecrementDisabled: false,
  levelIncrementDisabled: false,
  onGearDecrement: noop,
  onGearIncrement: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
  onSexToggle: noop,
};

export default PlayerStats;
