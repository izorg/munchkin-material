import connect from 'react-redux/es/connect/connect';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  setPlayerGender,
} from 'munchkin-core/es/actions';
import { FEMALE, MALE } from 'munchkin-core/es/constants/gender';

import Component from './Component';

const mapStateToProps = (state, ownProps) => ({
  player: state.players[ownProps.playerId],
});

const mapDispatchToProps = dispatch => ({
  onGearDecrement: player => dispatch(decrementPlayerGear(player)),
  onGearIncrement: player => dispatch(incrementPlayerGear(player)),
  onGenderToggle: (player) => {
    const { gender } = player;

    if (gender === MALE) {
      dispatch(setPlayerGender(player, FEMALE));
    } else if (gender === FEMALE) {
      dispatch(setPlayerGender(player, MALE));
    }
  },
  onLevelDecrement: player => dispatch(decrementPlayerLevel(player)),
  onLevelIncrement: player => dispatch(incrementPlayerLevel(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
