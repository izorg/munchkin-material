import { connect } from 'react-redux';
import { addMonster } from 'munchkin-core/lib/actions';
import Monster from 'munchkin-core/lib/classes/Monster';

import CombatHelperButton from '../../components/Combat/HelperButton';

const mapStateToProps = state => ({
  helper: !state.combat.helperId && state.playerList.length > 1,
  playerId: state.combat.playerId,
});

const mapDispatchToProps = {
  onMonsterAdd: () => addMonster(new Monster()),
};

export default connect(mapStateToProps, mapDispatchToProps)(CombatHelperButton);
