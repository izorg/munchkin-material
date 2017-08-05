import { connect } from 'react-redux';

import CombatButton from '../components/CombatButton';

const mapStateToProps = state => ({
  playerId: state.app.activePlayerId,
});

export default connect(mapStateToProps, undefined)(CombatButton);
