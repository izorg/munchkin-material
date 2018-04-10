import { START_COMBAT } from 'munchkin-core/lib/ducks/combat';

import { SET_THEME, setFullVersion } from '../../ducks/app';

const actionTypes = [SET_THEME, START_COMBAT];

export default (buyFullVersion) => ({ getState, dispatch }) => (next) => (
  action,
) => {
  if (actionTypes.includes(action.type)) {
    if (getState().app.fullVersion) {
      return Promise.resolve(next(action));
    }

    return buyFullVersion().then(() => {
      dispatch(setFullVersion(true));

      return next(action);
    });
  }

  return next(action);
};
