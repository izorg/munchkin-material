import createPlayer from '../../utils/createPlayer';
import { startCombat } from '../combat';
import { addPlayer } from '../players';

export const SET_EPIC = 'app/SET_EPIC';
export const SET_FULL_VERSION = 'app/SET_FULL_VERSION';
export const SET_KEEP_AWAKE = 'app/SET_KEEP_AWAKE';
export const SET_LOCALE = 'app/SET_LOCALE';
export const SET_LEVEL_LIMIT = 'app/SET_LEVEL_LIMIT';
export const SET_SINGLE_MODE = 'app/SET_SINGLE_MODE';
export const SET_SINGLE_MODE_PLAYER = 'app/SET_SINGLE_MODE_PLAYER';

export const setEpic = (epic = true) => ({
  type: SET_EPIC,
  epic,
});

export const setFullVersion = (fullVersion = true) => ({
  type: SET_FULL_VERSION,
  fullVersion,
});

export const setKeepAwake = (keepAwake) => ({
  type: SET_KEEP_AWAKE,
  keepAwake,
});

export const setLevelLimit = (levelLimit = true) => ({
  type: SET_LEVEL_LIMIT,
  levelLimit,
});

export const setLocale = (locale) => ({
  type: SET_LOCALE,
  locale,
});

export const setSingleMode = (singleMode) => async (dispatch, getState) => {
  if (singleMode) {
    let { singleModePlayerId } = getState().settings;

    if (!singleModePlayerId) {
      const player = createPlayer();

      dispatch(addPlayer(player));
      dispatch({
        type: SET_SINGLE_MODE_PLAYER,
        id: player.id,
      });

      singleModePlayerId = player.id;
    }

    dispatch(startCombat(singleModePlayerId));
  }

  dispatch({
    type: SET_SINGLE_MODE,
    singleMode,
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
