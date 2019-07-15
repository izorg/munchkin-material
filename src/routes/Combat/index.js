import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { addMonster, removeMonster } from '../../ducks/monsters';
import createMonster from '../../utils/createMonster';

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
    playerId,
  };
};

const mapDispatchToProps = {
  onMonsterAdd: () => addMonster(createMonster()),
  onMonsterRemove: removeMonster,
};

export default compose(
  hot,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Component);
