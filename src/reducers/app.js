import { START_COMBAT } from 'munchkin-core/lib/utils/actionTypes';

import { key as theme } from '../styles/themes/munchkin';
import * as types from '../utils/actionTypes';

const initialState = {
  combatFinished: false,
  dice: undefined,
  fullVersion: false,
  locale: undefined,
  selectedPlayerIds: [],
  theme,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.FINISH_COMBAT:
      return {
        ...state,
        combatFinished: true,
      };

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

    case types.SET_THEME: {
      return {
        ...state,
        theme: action.theme,
      };
    }

    case START_COMBAT: {
      return {
        ...state,
        combatFinished: false,
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
