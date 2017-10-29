import { connect } from 'react-redux';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
} from 'munchkin-core/es/actions';

import Player from '../../components/Combat/Player';

const getBonus = (playerId, combat) => {
  if (playerId === combat.playerId) {
    return combat.playerBonus;
  } else if (playerId === combat.helperId) {
    return combat.helperBonus;
  }

  return 0;
};

const mapStateToProps = (state, props) => ({
  bonus: getBonus(props.player.id, state.combat),
});

const mapDispatchToProps = {
  onGearDecrement: decrementPlayerGear,
  onGearIncrement: incrementPlayerGear,
  onLevelDecrement: decrementPlayerLevel,
  onLevelIncrement: incrementPlayerLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
