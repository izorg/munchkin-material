import connect from 'react-redux/es/connect/connect';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  setPlayerGender,
} from 'munchkin-core/es/actions';
import { FEMALE, MALE } from 'munchkin-core/es/utils/gender';

import Component from './Component';

const mapStateToProps = (state, ownProps) => ({
  player: state.players[ownProps.playerId],
});

const mapDispatchToProps = {
  onGearDecrement: decrementPlayerGear,
  onGearIncrement: incrementPlayerGear,
  onGenderToggle: id => (dispatch, getState) => {
    const player = getState().players[id];
    const { gender } = player;


    if (gender === MALE) {
      dispatch(setPlayerGender(id, FEMALE));
    } else if (gender === FEMALE) {
      dispatch(setPlayerGender(id, MALE));
    }
  },
  onLevelDecrement: decrementPlayerLevel,
  onLevelIncrement: incrementPlayerLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
