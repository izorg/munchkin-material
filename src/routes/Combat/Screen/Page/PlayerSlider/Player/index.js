import { connect } from 'react-redux';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from 'munchkin-core';

import Component from './Component';

const getBonus = (id, combat) => {
  if (id === combat.playerId) {
    return combat.playerBonus;
  } else if (id === combat.helperId) {
    return combat.helperBonus;
  }

  return 0;
};

const mapStateToProps = (state, ownProps) => ({
  ...state.players[ownProps.id],
  bonus: getBonus(ownProps.id, state.combat),
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
