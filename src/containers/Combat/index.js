import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Monster from 'munchkin-core/lib/classes/Monster';
import {
  addMonster,
  removeMonster,
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from 'munchkin-core/lib/actions';

import { removeHelper, throwDice } from '../../actions';
import Combat from '../../components/Combat';

const mapStateToProps = ({
  app, combat, monsters, players,
}) => ({
  helper: players[combat.helperId],
  helperBonus: combat.helperBonus,
  monsters: Object.values(monsters),
  player: players[app.activePlayerId],
  playerBonus: combat.playerBonus,
});

const mapDispatchToProps = {
  onBack: goBack,
  onDiceClick: throwDice,
  onHelperBonusChange: setCombatHelperBonus,
  onHelperRemove: removeHelper,
  onMonsterAdd: () => addMonster(new Monster()),
  onMonsterRemove: removeMonster,
  onPlayerBonusChange: setCombatPlayerBonus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Combat);
