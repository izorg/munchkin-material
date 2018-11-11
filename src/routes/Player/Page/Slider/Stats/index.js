import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
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
  get(['players', ownProps.playerId, 'level'], state);

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

const mapStateToProps = createStructuredSelector({
  levelDecrementDisabled,
  levelIncrementDisabled,
  player: (state, ownProps) => get(['players', ownProps.playerId], state),
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
