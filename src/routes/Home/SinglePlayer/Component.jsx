import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';

import Counter, { counterMessages } from '../../../components/Counter';
import CounterLabel from '../../../components/Counter/Label';
import Sex from '../../../components/Sex';
import { playerShape } from '../../../utils/propTypes';

const useStyles = makeStyles(
  (theme) => ({
    content: {
      alignSelf: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'column-reverse',
      height: '100%',
      margin: '0 auto',
      maxHeight: 600,
      maxWidth: 800,

      '@media (orientation: landscape)': {
        flexDirection: 'row',
      },
    },

    counters: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,

      '@media (orientation: landscape)': {
        flex: 2,
      },
    },

    counter: {
      flex: 1,
      overflow: 'hidden',
    },

    strengthCounter: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
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

      '@media (orientation: landscape)': {
        marginTop: 64,
      },
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
  }),
  { name: 'SinglePlayer' },
);

const SinglePlayer = ({
  bonus,
  levelDecrementDisabled,
  levelIncrementDisabled,
  onBonusDecrement,
  onBonusIncrement,
  onGearDecrement,
  onGearIncrement,
  onLevelDecrement,
  onLevelIncrement,
  onSexToggle,
  player,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.content}>
      <div className={classes.counters}>
        <Counter
          className={classes.counter}
          data-screenshots="level-counter"
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={onLevelDecrement}
          onIncrement={onLevelIncrement}
          title={intl.formatMessage(counterMessages.level)}
          value={player.level}
        />
        <Counter
          className={classes.counter}
          data-screenshots="gear-counter"
          onDecrement={onGearDecrement}
          onIncrement={onGearIncrement}
          title={intl.formatMessage(counterMessages.gear)}
          value={player.gear}
        />
        <Counter
          className={classes.counter}
          data-screenshots="modifier-counter"
          onDecrement={onBonusDecrement}
          onIncrement={onBonusIncrement}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </div>
      <div className={classes.strengthCounter}>
        <CounterLabel className={classes.strengthTitle}>
          {intl.formatMessage(counterMessages.strength)}
        </CounterLabel>

        <div className={classes.strengthValue}>
          {player.level + player.gear + bonus}
        </div>

        <IconButton className={classes.sex} onClick={onSexToggle}>
          <Sex className={classes.sexIcon} sex={player.sex} />
        </IconButton>
      </div>
    </div>
  );
};

SinglePlayer.propTypes = {
  bonus: PropTypes.number.isRequired,
  levelDecrementDisabled: PropTypes.bool,
  levelIncrementDisabled: PropTypes.bool,
  onBonusDecrement: PropTypes.func.isRequired,
  onBonusIncrement: PropTypes.func.isRequired,
  onGearDecrement: PropTypes.func.isRequired,
  onGearIncrement: PropTypes.func.isRequired,
  onLevelDecrement: PropTypes.func.isRequired,
  onLevelIncrement: PropTypes.func.isRequired,
  onSexToggle: PropTypes.func.isRequired,
  player: playerShape.isRequired,
};

SinglePlayer.defaultProps = {
  levelDecrementDisabled: false,
  levelIncrementDisabled: false,
};

SinglePlayer.displayName = 'SinglePlayer';

export default SinglePlayer;
