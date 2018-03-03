import { connect } from 'react-redux';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
} from 'munchkin-core/lib/actions';

import { togglePlayerGender } from '../../../../../../actions';

import Component from './Component';

const mapStateToProps = (state, ownProps) => ({
  player: state.players[ownProps.playerId],
});

const mapDispatchToProps = {
  onGearDecrement: decrementPlayerGear,
  onGearIncrement: incrementPlayerGear,
  onGenderToggle: togglePlayerGender,
  onLevelDecrement: decrementPlayerLevel,
  onLevelIncrement: incrementPlayerLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
