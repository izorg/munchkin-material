import * as types from '../constants/actionTypes';

const initialState = {
  activePlayerId: null,
  bannerVisible: false,
  dice: null,
  editMode: false,
  fullVersion: true,
  locale: null,
  multiMode: false,
  selectedPlayerIds: [],
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.HIDE_BANNER: {
      return {
        ...state,
        bannerVisible: false,
      };
    }

    case types.RESET_DICE: {
      const { dice } = initialState;

      return {
        ...state,
        dice,
      };
    }

    case types.SET_ACTIVE_PLAYER: {
      const id = action.id;

      return {
        ...state,
        activePlayerId: id || null,
      };
    }

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

    case types.SET_MULTI_MODE: {
      const { multiMode } = action;

      return {
        ...state,
        multiMode,
        selectedPlayerIds: [],
      };
    }

    case types.SHOW_BANNER: {
      return {
        ...state,
        bannerVisible: true,
      };
    }

    case types.THROW_DICE: {
      const { dice } = action;

      return {
        ...state,
        dice,
      };
    }

    case types.TOGGLE_EDIT_MODE: {
      const editMode = typeof action.editMode !== 'undefined' ? action.editMode : !state.editMode;

      return {
        ...state,
        editMode,
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

    default:
      return state;
  }
};

export default app;
