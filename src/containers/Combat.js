import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import Monster from 'munchkin-core/lib/classes/Monster';
import { addMonster, removeMonster } from 'munchkin-core/lib/actions';

import Combat from '../components/Combat';

const mapStateToProps = ({ app, combat, monsters, players }) => ({
  helper: players[combat.helperId],
  helperBonus: combat.helperBonus,
  monsters: Object.values(monsters),
  player: players[app.activePlayerId],
  playerBonus: combat.playerBonus,
});

const mapDispatchToProps = {
  onBack: goBack,
  onMonsterAdd: () => addMonster(new Monster()),
  onMonsterRemove: removeMonster,
};

export default connect(mapStateToProps, mapDispatchToProps)(Combat);
