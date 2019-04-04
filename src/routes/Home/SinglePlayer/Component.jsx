import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { IconButton, withStyles } from '@material-ui/core';

import { playerShape } from '../../../utils/propTypes';

import Counter from '../../../components/Counter';
import Sex from '../../../components/Sex';

const styles = (theme) => ({
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column-reverse',
  },

  counters: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },

  counter: {
    flex: 1,
  },

  strengthCounter: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },

  strengthTitle: {
    color: theme.palette.text.primary,
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 24,
  },

  strengthValue: {
    color: theme.palette.text.primary,
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 72, // 36px * 2
    lineHeight: 0.575, // 1.15 / 2
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
    content: {
      flexDirection: 'row',
    },

    counters: {
      flex: 2,
    },

    strengthValue: {
      marginTop: 64,
    },
  },

  [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
    content: {
      alignSelf: 'center',
      justifyContent: 'center',
      margin: [[0, 'auto']],
      maxWidth: 400,
      width: '100%',
    },

    counters: {
      flex: 'none',
      height: 240,
    },

    strengthCounter: {
      flex: 'none',
      height: 240,
    },
  },

  [`${theme.breakpoints.up('sm')} and (orientation: landscape)`]: {
    content: {
      margin: '0 auto',
      width: 480,
    },
  },
});

const SinglePlayerComponent = ({
  bonus,
  classes,
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
}) => (
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
      <div className={classes.strengthTitle}>
        <FormattedMessage
          defaultMessage="Strength"
          id="singlePlayer.strength"
        />
      </div>

      <div className={classes.strengthValue}>
        {player.level + player.gear + bonus}
      </div>

      <IconButton className={classes.sex} onClick={onSexToggle}>
        <Sex className={classes.sexIcon} sex={player.sex} />
      </IconButton>
    </div>
  </div>
);

SinglePlayerComponent.propTypes = {
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

SinglePlayerComponent.defaultProps = {
  levelDecrementDisabled: false,
  levelIncrementDisabled: false,
};

export default withStyles(styles)(SinglePlayerComponent);
