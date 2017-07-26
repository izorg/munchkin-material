import { connect } from 'react-redux';
import { actions, GENDER } from 'munchkin-core';

import PlayerStats from '../../components/Player/Stats';

const mapDispatchToProps = dispatch => ({
  onGearDecrement: player => dispatch(actions.decrementPlayerGear(player)),
  onGearIncrement: player => dispatch(actions.incrementPlayerGear(player)),
  onGenderToggle: (player) => {
    const { gender } = player;

    if (gender === GENDER.MALE) {
      dispatch(actions.setPlayerGender(player, GENDER.FEMALE));
    } else if (gender === GENDER.FEMALE) {
      dispatch(actions.setPlayerGender(player, GENDER.MALE));
    }
  },
  onLevelDecrement: player => dispatch(actions.decrementPlayerLevel(player)),
  onLevelIncrement: player => dispatch(actions.incrementPlayerLevel(player)),
});

export default connect(undefined, mapDispatchToProps)(PlayerStats);
