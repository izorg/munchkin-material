import { setPlayerSex } from 'munchkin-core/lib/ducks/players';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/sex';

// eslint-disable-next-line import/prefer-default-export
export const togglePlayerSex = (id) => (dispatch, getState) => {
  const player = getState().players[id];
  const { sex } = player;

  if (sex === MALE) {
    dispatch(setPlayerSex(id, FEMALE));
  } else if (sex === FEMALE) {
    dispatch(setPlayerSex(id, MALE));
  }
};
