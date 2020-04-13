import { SET_SINGLE_MODE, setFullVersion } from '../../ducks/app';
import { START_COMBAT } from '../../ducks/combat/actionTypes';
import { SET_THEME } from '../../ducks/theme';

const purchase = ({ buyFullVersion }) => {
  const { cordova } = window;

  const freeCombat = cordova?.platformId === 'ios';

  const actionTypes = [freeCombat ? SET_SINGLE_MODE : START_COMBAT, SET_THEME];

  return ({ dispatch, getState }) => (next) => (action) => {
    if (actionTypes.includes(action.type) && !getState().app.fullVersion) {
      if (
        action.type === SET_THEME &&
        getState().theme.id === action.theme.id
      ) {
        return next(action);
      }

      return buyFullVersion().then(() => {
        dispatch(setFullVersion(true));

        return next(action);
      });
    }

    return next(action);
  };
};

export default purchase;
