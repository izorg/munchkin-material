import { connect } from 'react-redux';
import {
  setCombatHelper,
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from 'munchkin-core/lib/ducks/combat';
import { addMonster, removeMonster } from 'munchkin-core/lib/ducks/monsters';
import createMonster from 'munchkin-core/lib/utils/createMonster';

import Component from './Component';

const mapStateToProps = (state) => {
  const {
    helperBonus,
    helperId,
    monsters,
    playerBonus,
    playerId,
  } = state.combat;

  const player = state.players[playerId];
  const helper = state.players[helperId];

  const playerStrength = player.level + player.gear + playerBonus;
  const helperStrength = helper ? helper.level + helper.gear + helperBonus : 0;

  const combinedMonsterStrength = monsters
    .map((id) => state.monsters[id])
    .reduce((strength, monster) => strength + monster.level + monster.bonus, 0);

  return {
    combinedMonsterStrength,
    combinedPlayerStrength: playerStrength + helperStrength,
    helperId,
    monsters: Object.values(state.monsters),
    playerId,
  };
};

const removeHelper = () => (dispatch) => {
  dispatch(setCombatHelper(null));
  dispatch(setCombatHelperBonus(0));
};

const mapDispatchToProps = {
  onHelperBonusChange: setCombatHelperBonus,
  onHelperRemove: removeHelper,
  onMonsterAdd: () => addMonster(createMonster()),
  onMonsterRemove: removeMonster,
  onPlayerBonusChange: setCombatPlayerBonus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
