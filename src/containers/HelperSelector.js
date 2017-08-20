import { connect } from 'react-redux';

import HelperSelector from '../components/HelperSelector';

const mapStateToProps = state => ({
  helpers: state.playerList
    .filter(id => id !== state.combat.playerId)
    .map(id => state.players[id]),
});

export default connect(mapStateToProps)(HelperSelector);
