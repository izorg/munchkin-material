import { START_COMBAT } from 'munchkin-core';

import { setFullVersion } from '../../ducks/app';
import { SET_THEME } from '../../ducks/theme';

const actionTypes = [SET_THEME, START_COMBAT];

export default (buyFullVersion) => ({ getState, dispatch }) => (next) => async (
  action,
) => {
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
