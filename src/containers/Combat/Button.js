import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { startCombat } from 'munchkin-core/lib/actions';

import CombatButton from '../../components/CombatButton';

const mapStateToProps = state => ({
  playerId: state.app.activePlayerId,
});

const mapDispatchToProps = dispatch => ({
  onCombatStart: (playerId) => {
    dispatch(startCombat(playerId));
    dispatch(push(`/player/${playerId}/combat`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CombatButton);
