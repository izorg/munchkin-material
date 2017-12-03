import connect from 'react-redux/es/connect/connect';
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

const mapStateToProps = (state, ownProps) => ({
  bonus: getBonus(ownProps.player.id, state.combat),
});

const mapDispatchToProps = {
  onGearDecrement: decrementPlayerGear,
  onGearIncrement: incrementPlayerGear,
  onLevelDecrement: decrementPlayerLevel,
  onLevelIncrement: incrementPlayerLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
