import { key as id } from '../../theme/colors/munchkin';

export const SET_THEME = 'theme/SET';

export const setTheme = (theme) => ({
  theme,
  type: SET_THEME,
});

const initialState = {
  id,
  mode: undefined,
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
