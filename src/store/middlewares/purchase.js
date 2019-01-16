import { START_COMBAT } from 'munchkin-core';

import { SET_SINGLE_MODE, setFullVersion } from '../../ducks/app';
import { SET_THEME } from '../../ducks/theme';

export default ({ buyFullVersion, freeCombat }) => {
  const actionTypes = [freeCombat ? SET_SINGLE_MODE : START_COMBAT, SET_THEME];

  return ({ getState, dispatch }) => (next) => async (action) => {
    if (actionTypes.includes(action.type)) {
      if (getState().app.fullVersion) {
        return Promise.resolve(next(action));
      }

      await buyFullVersion();
      dispatch(setFullVersion(true));

      return next(action);
    }

    return next(action);
  };
};
