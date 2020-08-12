export const TOGGLE_MENU = 'ui/TOGGLE_MENU';
export const TOGGLE_PLAYER = 'ui/TOGGLE_PLAYER';
export const UNSELECT_ALL_PLAYERS = 'ui/UNSELECT_ALL_PLAYERS';

export const toggleMenu = () => ({
  type: TOGGLE_MENU,
});

export const togglePlayer = (id) => ({
  type: TOGGLE_PLAYER,
  id,
});

export const unselectAllPlayers = () => ({
  type: UNSELECT_ALL_PLAYERS,
});

export const initialState = {
  menuCollapsed: true,
  selectedPlayerIds: [],
};

export const menuCollapsedSelector = (state) => state.ui.menuCollapsed;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuCollapsed: !state.menuCollapsed,
      };

    case TOGGLE_PLAYER: {
      const { id } = action;

      if (state.selectedPlayerIds.includes(id)) {
        return {
          ...state,
          selectedPlayerIds: state.selectedPlayerIds.filter(
            (selectedId) => selectedId !== id,
          ),
        };
      }

      return {
        ...state,
        selectedPlayerIds: [...state.selectedPlayerIds, id],
      };
    }

    case UNSELECT_ALL_PLAYERS: {
      const { selectedPlayerIds } = initialState;

      return {
        ...state,
        selectedPlayerIds,
      };
    }

    default:
      return state;
  }
};

export default reducer;
