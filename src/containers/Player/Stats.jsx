import { connect } from 'react-redux';
import { actions } from 'munchkin';

import PlayerStats from '../../components/Player/Stats';

const mapDispatchToProps = dispatch => ({
  onGearDecrement: player => dispatch(actions.decrementPLayerGear(player)),
  onGearIncrement: player => dispatch(actions.incrementPLayerGear(player)),
  onLevelDecrement: player => dispatch(actions.decrementPLayerLevel(player)),
  onLevelIncrement: player => dispatch(actions.incrementPLayerLevel(player)),
});

export default connect(undefined, mapDispatchToProps)(PlayerStats);
