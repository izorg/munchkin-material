import { SET_SINGLE_MODE, setFullVersion } from '../../ducks/app';
import { START_COMBAT } from '../../ducks/combat/actionTypes';
import { SET_THEME } from '../../ducks/theme';

const purchase = ({ buyFullVersion, freeCombat }) => {
  const actionTypes = [freeCombat ? SET_SINGLE_MODE : START_COMBAT, SET_THEME];

  return ({ dispatch, getState }) => (next) => (action) => {
    if (actionTypes.includes(action.type) && !getState().app.fullVersion) {
      return buyFullVersion().then(() => {
        dispatch(setFullVersion(true));
        return next(action);
      });
    }

    return next(action);
  };
};

export default purchase;
