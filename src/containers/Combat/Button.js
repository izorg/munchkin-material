import { connect } from 'react-redux';

import { goToCombat } from '../../actions';
import CombatButton from '../../components/CombatButton';

const mapStateToProps = state => ({
  playerId: state.app.activePlayerId,
});

const mapDispatchToProps = {
  onCombatStart: goToCombat,
};

export default connect(mapStateToProps, mapDispatchToProps)(CombatButton);
