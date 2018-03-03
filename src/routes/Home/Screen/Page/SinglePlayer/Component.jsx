import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';

import { playerShape } from '../../../../../utils/propTypes';

import Counter from '../../../../../components/Counter';
import Gender from '../../../../../components/Gender';

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
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 24,
  },

  strengthValue: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 72, // 36px * 2
    lineHeight: 0.575, // 1.15 / 2
    marginTop: 32,
  },

  gender: {
    fontSize: 36,
    height: 64,
    padding: 12,
    width: 64,
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
});

class SinglePlayerComponent extends PureComponent {
  render() {
    const {
      bonus,
      classes,
      onBonusDecrement,
      onBonusIncrement,
      onGearDecrement,
      onGearIncrement,
      onGenderToggle,
      onLevelDecrement,
      onLevelIncrement,
      player,
    } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.counters}>
          <Counter
            className={classes.counter}
            onDecrement={onLevelDecrement}
            onIncrement={onLevelIncrement}
            title={
              <FormattedMessage
                id="singlePlayer.level"
                defaultMessage="Level"
              />
            }
            value={player.level}
          />
          <Counter
            className={classes.counter}
            onDecrement={onGearDecrement}
            onIncrement={onGearIncrement}
            title={
              <FormattedMessage id="singlePlayer.gear" defaultMessage="Gear" />
            }
            value={player.gear}
          />
          <Counter
            className={classes.counter}
            onDecrement={onBonusDecrement}
            onIncrement={onBonusIncrement}
            title={
              <FormattedMessage
                id="singlePlayer.modifier"
                defaultMessage="Modifier"
              />
            }
            value={bonus}
          />
        </div>
        <div className={classes.strengthCounter}>
          <div className={classes.strengthTitle}>
            <FormattedMessage
              id="singlePlayer.strength"
              defaultMessage="Strength"
            />
          </div>

          <div className={classes.strengthValue}>
            {player.level + player.gear + bonus}
          </div>

          <IconButton
            className={classes.gender}
            color="inherit"
            onClick={onGenderToggle}
          >
            <Gender gender={player.gender} />
          </IconButton>
        </div>
      </div>
    );
  }
}

SinglePlayerComponent.propTypes = {
  bonus: PropTypes.number.isRequired,
  onBonusDecrement: PropTypes.func.isRequired,
  onBonusIncrement: PropTypes.func.isRequired,
  onGearDecrement: PropTypes.func.isRequired,
  onGearIncrement: PropTypes.func.isRequired,
  onGenderToggle: PropTypes.func.isRequired,
  onLevelDecrement: PropTypes.func.isRequired,
  onLevelIncrement: PropTypes.func.isRequired,
  player: playerShape.isRequired,
};

export default withStyles(styles)(SinglePlayerComponent);
