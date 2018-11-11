import { connect } from 'react-redux';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from 'munchkin-core';
import { get } from 'lodash/fp';

import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from '../../../../../utils/levelLimit';

import Component from './Component';

const getPlayerLevel = (state, ownProps) =>
  get(['players', ownProps.id, 'level'], state);

const levelDecrementDisabled = (state, ownProps) => {
  const levelLimit = get(['app', 'levelLimit'], state);
  const level = getPlayerLevel(state, ownProps);

  return isLevelDecrementDisabled(level, levelLimit);
};

const levelIncrementDisabled = (state, ownProps) => {
  const levelLimit = get(['app', 'levelLimit'], state);
  const epic = get(['app', 'epic'], state);
  const level = getPlayerLevel(state, ownProps);

  return isLevelIncrementDisabled(level, levelLimit, epic);
};

const getBonus = (id, combat) => {
  if (id === combat.playerId) {
    return combat.playerBonus;
  }

  if (id === combat.helperId) {
    return combat.helperBonus;
  }

  return 0;
};

const mapStateToProps = (state, ownProps) => ({
  ...state.players[ownProps.id],
  bonus: getBonus(ownProps.id, state.combat),
  levelDecrementDisabled: levelDecrementDisabled(state, ownProps),
  levelIncrementDisabled: levelIncrementDisabled(state, ownProps),
});

const mapDispatchToProps = {
  onGearDecrement: decrementPlayerGear,
  onGearIncrement: incrementPlayerGear,
  onLevelDecrement: decrementPlayerLevel,
  onLevelIncrement: incrementPlayerLevel,
  onSexToggle: togglePlayerSex,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
