import * as types from '../utils/actionTypes';

const initialState = {
  dice: null,
  fullVersion: false,
  locale: null,
  selectedPlayerIds: [],
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FULL_VERSION:
      return {
        ...state,
        fullVersion: action.fullVersion,
      };

    case types.SET_LOCALE: {
      return {
        ...state,
        locale: action.locale,
      };
    }

    case types.THROW_DICE: {
      const { dice } = action;

      return {
        ...state,
        dice,
      };
    }

    case types.TOGGLE_PLAYER: {
      const { id } = action;

      if (state.selectedPlayerIds.includes(id)) {
        return {
          ...state,
          selectedPlayerIds: state.selectedPlayerIds.filter(selectedId => selectedId !== id),
        };
      }

      return {
        ...state,
        selectedPlayerIds: [
          ...state.selectedPlayerIds,
          id,
        ],
      };
    }

    case types.UNSELECT_ALL_PLAYERS: {
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

export default app;
