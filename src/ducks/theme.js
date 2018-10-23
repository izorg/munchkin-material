import { key as id } from '../styles/themes/munchkin';

export const SET_THEME = 'theme/SET';

const initialState = {
  id,
  type: 'light',
};

export default (state = initialState, action) => {
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

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});
