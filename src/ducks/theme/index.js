import { key as id } from '../../styles/themes/munchkin';

export const SET_THEME = 'theme/SET';

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});

const mode =
  'matchMedia' in window && window.matchMedia('(prefers-color-scheme)').matches
    ? undefined
    : 'light';

const initialState = {
  id,
  mode,
  pureBlack: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME: {
      return {
        ...state,
        ...action.theme,
      };
    }

    default:
      return state;
  }
};

export default reducer;
