import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Monster from 'munchkin-core/lib/classes/Monster';
import {
  addMonster,
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  removeMonster,
  setCombatHelper,
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from 'munchkin-core/lib/actions';

import Combat from '../../components/Combat';

const mapStateToProps = ({ app, combat, monsters, players }) => ({
  helper: players[combat.helperId],
  helperBonus: combat.helperBonus,
  monsters: Object.values(monsters),
  player: players[app.activePlayerId],
  playerBonus: combat.playerBonus,
});

const mapDispatchToProps = {
  onBack: goBack,
  onHelperBonusChange: setCombatHelperBonus,
  onHelperGearDecrement: helper => decrementPlayerGear(helper),
  onHelperGearIncrement: helper => incrementPlayerGear(helper),
  onHelperLevelDecrement: helper => decrementPlayerLevel(helper),
  onHelperLevelIncrement: helper => incrementPlayerLevel(helper),
  onHelperRemove: () => setCombatHelper(null),
  onMonsterAdd: () => addMonster(new Monster()),
  onMonsterRemove: removeMonster,
  onPlayerBonusChange: setCombatPlayerBonus,
  onPlayerGearDecrement: player => decrementPlayerGear(player),
  onPlayerGearIncrement: player => incrementPlayerGear(player),
  onPlayerLevelDecrement: player => decrementPlayerLevel(player),
  onPlayerLevelIncrement: player => incrementPlayerLevel(player),
};

export default connect(mapStateToProps, mapDispatchToProps)(Combat);
