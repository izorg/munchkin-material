import { connect } from 'react-redux';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from 'munchkin-core';

import Component from './Component';

const mapStateToProps = (state, ownProps) => ({
  player: state.players[ownProps.playerId],
});

const mapDispatchToProps = {
  onGearDecrement: decrementPlayerGear,
  onGearIncrement: incrementPlayerGear,
  onLevelDecrement: decrementPlayerLevel,
  onLevelIncrement: incrementPlayerLevel,
  onSexToggle: togglePlayerSex,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
