import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { Player } from 'munchkin-core';
import cns from 'classnames';

import cn from './style.css';

import Counter from '../../Counter';
import Gender from '../../Gender';
import { noop } from '../../../constants';

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
    const { className, player } = this.props;

    return (
      <div className={cns(className, cn.stats)}>
        <div className={cn.counters}>
          <div className={cn.counterContainer}>
            <Counter
              onDecrement={this.handleLevelDecrement}
              onIncrement={this.handleLevelIncrement}
              title={<FormattedMessage id="player.stats.level" defaultMessage="Level" />}
              value={player.level}
            />
          </div>
          <div className={cn.counterContainer}>
            <Counter
              onDecrement={this.handleGearDecrement}
              onIncrement={this.handleGearIncrement}
              title={<FormattedMessage id="player.stats.gear" defaultMessage="Gear" />}
              value={player.gear}
            />
          </div>
        </div>
        <div className={cn.mainContainer}>
          <div className={cn.strengthCounter}>
            <div className={cn.strengthTitle}>
              <FormattedMessage id="player.stats.strength" defaultMessage="Strength" />
            </div>

            <div className={cn.strengthValue}>
              {player.strength}
            </div>

            <IconButton
              iconStyle={{
                width: 36,
                height: 36,
              }}
              onTouchTap={this.handleGenderToggle}
              style={{
                width: 64,
                height: 64,
                padding: 12,
              }}
            >
              <Gender gender={player.gender} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

PlayerStats.propTypes = {
  className: PropTypes.string,
  onGearDecrement: PropTypes.func,
  onGearIncrement: PropTypes.func,
  onGenderToggle: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  player: PropTypes.instanceOf(Player).isRequired,
};

PlayerStats.defaultProps = {
  className: '',
  onGearDecrement: noop,
  onGearIncrement: noop,
  onGenderToggle: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
};

export default PlayerStats;
