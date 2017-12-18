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

const mapDispatchToProps = (dispatch, { player }) => ({
  onGearDecrement: () => dispatch(decrementPlayerGear(player)),
  onGearIncrement: () => dispatch(incrementPlayerGear(player)),
  onGenderToggle: () => {
    const { gender } = player;

    if (gender === MALE) {
      dispatch(setPlayerGender(player, FEMALE));
    } else if (gender === FEMALE) {
      dispatch(setPlayerGender(player, MALE));
    }
  },
  onLevelDecrement: () => dispatch(decrementPlayerLevel(player)),
  onLevelIncrement: () => dispatch(incrementPlayerLevel(player)),
});

export default connect(undefined, mapDispatchToProps)(Component);
