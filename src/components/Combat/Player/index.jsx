import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Counter from '../../Counter';
import { noop } from '../../../constants';
import { playerInstance } from '../../../utils/propTypes';

import cn from './style.css';

class CombatPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleGearDecrement = this.handleGearDecrement.bind(this);
    this.handleGearIncrement = this.handleGearIncrement.bind(this);
    this.handleLevelDecrement = this.handleLevelDecrement.bind(this);
    this.handleLevelIncrement = this.handleLevelIncrement.bind(this);
  }

  handleBonusChange(value) {
    const { bonus, onBonusChange } = this.props;

    onBonusChange(bonus + value);
  }

  handleGearDecrement() {
    const { player, onGearDecrement } = this.props;

    onGearDecrement(player);
  }

  handleGearIncrement() {
    const { player, onGearIncrement } = this.props;

    onGearIncrement(player);
  }

  handleLevelDecrement() {
    const { player, onLevelDecrement } = this.props;

    onLevelDecrement(player);
  }

  handleLevelIncrement() {
    const { player, onLevelIncrement } = this.props;

    onLevelIncrement(player);
  }

  render() {
    const { bonus, player } = this.props;

    return (
      <div className={cn.player} key={player.id.toString()}>
        <div className={cn.name}>{player.name}</div>
        <div className={cn.stats}>
          <Counter
            className={cn.item}
            compact
            onDecrement={this.handleLevelDecrement}
            onIncrement={this.handleLevelIncrement}
            title="Level"
            value={player.level}
          />
          <Counter
            className={cn.item}
            compact
            onDecrement={this.handleGearDecrement}
            onIncrement={this.handleGearIncrement}
            title="Gear"
            value={player.gear}
          />
          <Counter
            className={cn.item}
            compact
            onDecrement={() => this.handleBonusChange(-1)}
            onIncrement={() => this.handleBonusChange(+1)}
            title="Bonus"
            value={bonus}
          />
        </div>
      </div>
    );
  }
}

CombatPlayer.propTypes = {
  bonus: PropTypes.number.isRequired,
  onBonusChange: PropTypes.func,
  onGearDecrement: PropTypes.func,
  onGearIncrement: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  player: playerInstance.isRequired,
};

CombatPlayer.defaultProps = {
  onBonusChange: noop,
  onGearDecrement: noop,
  onGearIncrement: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
};

export default CombatPlayer;
