import connect from 'react-redux/es/connect/connect';
import {
  addMonster,
  removeMonster,
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from 'munchkin-core/es/actions';
import createMonster from 'munchkin-core/es/utils/createMonster';

import { removeHelper } from '../../../../actions';

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

const mapDispatchToProps = {
  onHelperBonusChange: setCombatHelperBonus,
  onHelperRemove: removeHelper,
  onMonsterAdd: () => addMonster(createMonster()),
  onMonsterRemove: removeMonster,
  onPlayerBonusChange: setCombatPlayerBonus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
