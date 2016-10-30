import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Player } from 'munchkin';

import cn from './style.css';

import Counter from '../../Counter';
import { noop } from '../../../constants';

class PlayerStats extends Component {
  componentWillMount() {
    this.handleGearDecrement = this.handleGearDecrement.bind(this);
    this.handleGearIncrement = this.handleGearIncrement.bind(this);

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

  handleLevelDecrement() {
    const { onLevelDecrement, player } = this.props;

    onLevelDecrement(player);
  }

  handleLevelIncrement() {
    const { onLevelIncrement, player } = this.props;

    onLevelIncrement(player);
  }

  render() {
    const { player } = this.props;

    return (
      <div className={cn.stats}>
        <div className={cn.row}>
          <Counter
            readOnly
            title={<FormattedMessage id="player.stats.strength" defaultMessage="Strength" />}
            value={player.strength}
          />
        </div>
        <div className={cn.row}>
          <Counter
            onDecrement={this.handleLevelDecrement}
            onIncrement={this.handleLevelIncrement}
            title={<FormattedMessage id="player.stats.level" defaultMessage="Level" />}
            value={player.level}
          />
          <Counter
            onDecrement={this.handleGearDecrement}
            onIncrement={this.handleGearIncrement}
            title={<FormattedMessage id="player.stats.gear" defaultMessage="Gear" />}
            value={player.gear}
          />
        </div>
      </div>
    );
  }
}

PlayerStats.propTypes = {
  onGearDecrement: PropTypes.func,
  onGearIncrement: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  player: PropTypes.instanceOf(Player).isRequired,
};

PlayerStats.defaultProps = {
  onGearDecrement: noop,
  onGearIncrement: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
};

export default PlayerStats;
