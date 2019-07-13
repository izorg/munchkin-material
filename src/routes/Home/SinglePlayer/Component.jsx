import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';

import Counter from '../../../components/Counter';
import CounterLabel from '../../../components/Counter/Label';
import Sex from '../../../components/Sex';
import { playerShape } from '../../../utils/propTypes';

const useStyles = makeStyles(
  (theme) => ({
    content: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column-reverse',

      '@media (orientation: landscape)': {
        flexDirection: 'row',
      },

      [theme.breakpoints.up('sm')]: {
        margin: '0 auto',

        '@media (orientation: portrait)': {
          alignSelf: 'center',
          justifyContent: 'center',
          maxWidth: 480,
          width: '100%',
        },

        '@media (orientation: landscape)': {
          width: 480,
        },
      },
    },

    counters: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,

      '@media (orientation: landscape)': {
        flex: 2,
      },

      [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
        flex: 'none',
        height: 240,
      },
    },

    counter: {
      flex: 1,
      overflowX: 'hidden',
    },

    strengthCounter: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',

      [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
        flex: 'none',
        height: 240,
      },
    },

    strengthTitle: {
      fontSize: 24,
    },

    strengthValue: {
      color: theme.palette.text.primary,
      fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
      fontSize: 72, // 36px * 2
      lineHeight: 0.575, // 1.15 / 2
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
          title={
            <FormattedMessage defaultMessage="Level" id="singlePlayer.level" />
          }
          value={player.level}
        />
        <Counter
          className={classes.counter}
          data-screenshots="gear-counter"
          onDecrement={onGearDecrement}
          onIncrement={onGearIncrement}
          title={
            <FormattedMessage defaultMessage="Gear" id="singlePlayer.gear" />
          }
          value={player.gear}
        />
        <Counter
          className={classes.counter}
          data-screenshots="modifier-counter"
          onDecrement={onBonusDecrement}
          onIncrement={onBonusIncrement}
          title={
            <FormattedMessage
              defaultMessage="Modifier"
              id="singlePlayer.modifier"
            />
          }
          value={bonus}
        />
      </div>
      <div className={classes.strengthCounter}>
        <CounterLabel className={classes.strengthTitle}>
          <FormattedMessage
            defaultMessage="Strength"
            id="singlePlayer.strength"
          />
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
