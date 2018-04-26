import { START_COMBAT, startCombat } from 'munchkin-core/lib/ducks/combat';
import { addPlayer } from 'munchkin-core/lib/ducks/players';
import createPlayer from 'munchkin-core/lib/utils/createPlayer';

import { key as theme } from '../styles/themes/munchkin';

export const FINISH_COMBAT = 'app/FINISH_COMBAT';
export const SET_FULL_VERSION = 'app/SET_FULL_VERSION';
export const SET_KEEP_AWAKE = 'app/SET_KEEP_AWAKE';
export const SET_LOCALE = 'app/SET_LOCALE';
export const SET_SINGLE_MODE_PLAYER = 'app/SET_SINGLE_MODE_PLAYER';
export const SET_THEME = 'app/SET_THEME';
export const THROW_DICE = 'app/THROW_DICE';
export const TOGGLE_PLAYER = 'app/TOGGLE_PLAYER';
export const UNSELECT_ALL_PLAYERS = 'app/UNSELECT_ALL_PLAYERS';

const initialState = {
  combatFinished: false,
  dice: undefined,
  fullVersion: false,
  keepAwake: false,
  locale: undefined,
  selectedPlayerIds: [],
  singleModePlayerId: undefined,
  theme,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FINISH_COMBAT:
      return {
        ...state,
        combatFinished: true,
      };

    case SET_FULL_VERSION:
      return {
        ...state,
        fullVersion: action.fullVersion,
      };

    case SET_KEEP_AWAKE: {
      return {
        ...state,
        keepAwake: action.keepAwake,
      };
    }

    case SET_LOCALE: {
      return {
        ...state,
        locale: action.locale,
      };
    }

    case SET_SINGLE_MODE_PLAYER: {
      return {
        ...state,
        singleModePlayerId: action.id,
      };
    }

    case SET_THEME: {
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

    case THROW_DICE: {
      const { dice } = action;

      return {
        ...state,
        dice,
      };
    }

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

export const finishCombat = () => ({
  type: FINISH_COMBAT,
});

export const setFullVersion = (fullVersion = true) => ({
  type: SET_FULL_VERSION,
  fullVersion,
});

export const setKeepAwake = (keepAwake) => ({
  type: SET_KEEP_AWAKE,
  keepAwake,
});

export const setLocale = (locale) => ({
  type: SET_LOCALE,
  locale,
});

export const setSingleMode = () => (dispatch, getState) => {
  const {
    app: { singleModePlayerId },
  } = getState();

  if (!singleModePlayerId) {
    const player = createPlayer();

    dispatch(addPlayer(player));
    dispatch({
      type: SET_SINGLE_MODE_PLAYER,
      id: player.id,
    });

    return dispatch(startCombat(player.id));
  }

  return dispatch(startCombat(singleModePlayerId));
};

// eslint-disable-next-line no-shadow
export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});

export const throwDice = () => ({
  type: THROW_DICE,
  dice: Math.floor(Math.random() * 6) + 1,
});

export const togglePlayer = (id) => ({
  type: TOGGLE_PLAYER,
  id,
});

export const unselectAllPlayers = () => ({
  type: UNSELECT_ALL_PLAYERS,
});
