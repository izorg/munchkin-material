import { connectAdvanced } from 'react-redux/es';
import { createSelector } from 'reselect';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  setPlayerGender,
} from 'munchkin-core/es/actions';
import { FEMALE, MALE } from 'munchkin-core/es/constants/gender';

import Stats from '../../../components/Player/Stats';
import { playerInstance } from '../../../utils/propTypes';

const selector = createSelector(
  ownProps => ownProps.player,
  (ownProps, dispatch) => dispatch,
  (player, dispatch) => ({
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
  }),
);

const selectorFactory = dispatch => (state, ownProps) => ({
  ...ownProps,
  ...selector(ownProps, dispatch),
});

const PlayerStats = connectAdvanced(selectorFactory)(Stats);

PlayerStats.propTypes = {
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
};

export default PlayerStats;
