import connect from 'react-redux/es/connect/connect';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
} from 'munchkin-core/es/actions';

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
