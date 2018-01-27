import connect from 'react-redux/es/connect/connect';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
} from 'munchkin-core/es/actions';

import { togglePlayerGender } from '../../../../../../actions';

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
  onGenderToggle: togglePlayerGender,
  onLevelDecrement: decrementPlayerLevel,
  onLevelIncrement: incrementPlayerLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
