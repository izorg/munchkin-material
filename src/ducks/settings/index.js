import createPlayer from "../../utils/createPlayer";
import { startCombat } from "../combat";
import { addPlayer } from "../players";

export const SET_EPIC = "app/SET_EPIC";
export const SET_FULL_VERSION = "app/SET_FULL_VERSION";
export const SET_KEEP_AWAKE = "app/SET_KEEP_AWAKE";
export const SET_LOCALE = "app/SET_LOCALE";
export const SET_LEVEL_LIMIT = "app/SET_LEVEL_LIMIT";
export const SET_SINGLE_MODE = "app/SET_SINGLE_MODE";
export const SET_SINGLE_MODE_PLAYER = "app/SET_SINGLE_MODE_PLAYER";

export const setEpic = (epic = true) => ({
  epic,
  type: SET_EPIC,
});

export const setFullVersion = (fullVersion = true) => ({
  fullVersion,
  type: SET_FULL_VERSION,
});

export const setKeepAwake = (keepAwake) => ({
  keepAwake,
  type: SET_KEEP_AWAKE,
});

export const setLevelLimit = (levelLimit = true) => ({
  levelLimit,
  type: SET_LEVEL_LIMIT,
});

export const setLocale = (locale) => ({
  locale,
  type: SET_LOCALE,
});

export const setSingleMode = (singleMode) => async (dispatch, getState) => {
  if (singleMode) {
    let { singleModePlayerId } = getState().present.settings;

    if (!singleModePlayerId) {
      const player = createPlayer();

      dispatch(addPlayer(player));
      dispatch({
        id: player.id,
        type: SET_SINGLE_MODE_PLAYER,
      });

      singleModePlayerId = player.id;
    }

    dispatch(startCombat(singleModePlayerId));
  }

  dispatch({
    singleMode,
    type: SET_SINGLE_MODE,
  });
};

const initialState = {
  epic: false,
  fullVersion: false,
  keepAwake: false,
  levelLimit: false,
  locale: undefined,
  singleMode: false,
  singleModePlayerId: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EPIC:
      return {
        ...state,
        epic: action.epic,
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

    case SET_LEVEL_LIMIT: {
      return {
        ...state,
        levelLimit: action.levelLimit,
      };
    }

    case SET_LOCALE: {
      return {
        ...state,
        locale: action.locale,
      };
    }

    case SET_SINGLE_MODE: {
      return {
        ...state,
        singleMode: action.singleMode,
      };
    }

    case SET_SINGLE_MODE_PLAYER: {
      return {
        ...state,
        singleModePlayerId: action.id,
      };
    }

    default:
      return state;
  }
};

export default reducer;
