export const TOGGLE_MENU = 'ui/TOGGLE_MENU';

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
});

export const initialState = {
  menuCollapsed: true,
};

export const menuCollapsedSelector = (state) => state.ui.menuCollapsed;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuCollapsed: !state.menuCollapsed,
      };

    default:
      return state;
  }
};

export default reducer;
