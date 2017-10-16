import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

import Counter from '../../Counter';
import Gender from '../../Gender';
import { noop } from '../../../constants';
import { classesObject, playerInstance } from '../../../utils/propTypes';

const styles = theme => ({
  stats: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 50%',
    justifyContent: 'center',
  },

  counters: {
    flex: '1 1 50%',
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
    display: 'none',
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 24,
  },

  strengthValue: {
    display: 'none',
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 72, /* 36px * 2 */
    lineHeight: 0.575, /* 1.15 / 2 */
    marginTop: 32,
  },

  '@media (orientation: portrait) and (min-height: 383px)': {
    strengthValue: {
      display: 'block',
    },
  },

  '@media (orientation: portrait) and (min-height: 447px)': {
    strengthTitle: {
      display: 'block',
    },
  },

  '@media (orientation: portrait) and (min-height: 543px)': {
    stats: {
      flexDirection: 'column-reverse',
    },
  },

  '@media (orientation: landscape)': {
    stats: {
      flexDirection: 'row',
    },

    strengthTitle: {
      display: 'block',
    },

    strengthValue: {
      display: 'block',
      marginTop: 64,
    },
  },
});

class PlayerStats extends Component {
  componentWillMount() {
    this.handleGearDecrement = this.handleGearDecrement.bind(this);
    this.handleGearIncrement = this.handleGearIncrement.bind(this);

    this.handleGenderToggle = this.handleGenderToggle.bind(this);

    this.handleLevelDecrement = this.handleLevelDecrement.bind(this);
    this.handleLevelIncrement = this.handleLevelIncrement.bind(this);
  }

  handleGearDecrement() {
    const { onGearDecrement, player } = this.props;

    onGearDecrement(player);
  }

  handleGearIncrement() {
    const { onGearIncrement, player } = this.props;

    onGearIncrement(player);
  }

  handleGenderToggle() {
    const { onGenderToggle, player } = this.props;

    onGenderToggle(player);
  }

  handleLevelDecrement() {
    const { onLevelDecrement, player } = this.props;

    onLevelDecrement(player);
  }

  handleLevelIncrement() {
    const { onLevelIncrement, player } = this.props;

    onLevelIncrement(player);
  }

  render() {
    const { classes, className, player } = this.props;

    return (
      <div className={cns(className, classes.stats)}>
        <div className={classes.counters}>
          <div className={classes.counterContainer}>
            <Counter
              onDecrement={this.handleLevelDecrement}
              onIncrement={this.handleLevelIncrement}
              title={<FormattedMessage id="player.stats.level" defaultMessage="Level" />}
              value={player.level}
            />
          </div>
          <div className={classes.counterContainer}>
            <Counter
              onDecrement={this.handleGearDecrement}
              onIncrement={this.handleGearIncrement}
              title={<FormattedMessage id="player.stats.gear" defaultMessage="Gear" />}
              value={player.gear}
            />
          </div>
        </div>
        <div className={classes.mainContainer}>
          <div className={classes.strengthCounter}>
            <div className={classes.strengthTitle}>
              <FormattedMessage id="player.stats.strength" defaultMessage="Strength" />
            </div>

            <div className={classes.strengthValue}>
              {player.strength}
            </div>

            <IconButton
              color="inherit"
              onClick={this.handleGenderToggle}
              style={{
                width: 64,
                height: 64,
                padding: 12,
              }}
            >
              <Gender
                gender={player.gender}
                style={{
                  width: 36,
                  height: 36,
                }}
              />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

PlayerStats.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
  onGearDecrement: PropTypes.func,
  onGearIncrement: PropTypes.func,
  onGenderToggle: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
};

PlayerStats.defaultProps = {
  className: '',
  onGearDecrement: noop,
  onGearIncrement: noop,
  onGenderToggle: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
};

export default withStyles(styles)(PlayerStats);
