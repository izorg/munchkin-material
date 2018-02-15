import { START_COMBAT } from 'munchkin-core/lib/utils/actionTypes';

import { setFullVersion } from '../../actions';
import { SET_THEME } from '../../utils/actionTypes';

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
