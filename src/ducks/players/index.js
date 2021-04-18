import toggleSex from "../../utils/toggleSex";

import {
  ADD_PLAYER,
  DECREMENT_PLAYER_GEAR,
  DECREMENT_PLAYER_LEVEL,
  INCREMENT_PLAYER_GEAR,
  INCREMENT_PLAYER_LEVEL,
  KILL_PLAYER,
  REMOVE_PLAYERS,
  RESET_PLAYERS,
  TOGGLE_PLAYER_SEX,
  UPDATE_PLAYER,
} from "./actionTypes";

export const addPlayer = (player) => ({
  player,
  type: ADD_PLAYER,
});

export const decrementPlayerGear = (id) => ({
  id,
  type: DECREMENT_PLAYER_GEAR,
});

export const decrementPlayerLevel = (id) => ({
  id,
  type: DECREMENT_PLAYER_LEVEL,
});

export const incrementPlayerGear = (id) => ({
  id,
  type: INCREMENT_PLAYER_GEAR,
});

export const incrementPlayerLevel = (id) => ({
  id,
  type: INCREMENT_PLAYER_LEVEL,
});

export const killPlayer = (id) => ({
  id,
  type: KILL_PLAYER,
});

export const removePlayers = (playerList) => ({
  playerList,
  type: REMOVE_PLAYERS,
});

export const resetPlayers = (playerList) => ({
  playerList,
  type: RESET_PLAYERS,
});

export const togglePlayerSex = (id) => ({
  id,
  type: TOGGLE_PLAYER_SEX,
});

export const updatePlayer = (player) => ({
  player,
  type: UPDATE_PLAYER,
});

export const playerReducer = (state, action) => {
  switch (action.type) {
    case DECREMENT_PLAYER_GEAR:
      return {
        ...state,
        gear: state.gear - 1,
      };

    case DECREMENT_PLAYER_LEVEL:
      return {
        ...state,
        level: state.level - 1,
      };

    case INCREMENT_PLAYER_GEAR:
      return {
        ...state,
        gear: state.gear + 1,
      };

    case INCREMENT_PLAYER_LEVEL:
      return {
        ...state,
        level: state.level + 1,
      };

    case KILL_PLAYER:
      return {
        ...state,
        gear: 0,
      };

    case TOGGLE_PLAYER_SEX:
      return {
        ...state,
        sex: toggleSex(state.sex),
      };

    case UPDATE_PLAYER:
      return {
        ...state,
        ...action.player,
      };

    default:
      return state;
  }
};

export const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      return {
        ...state,
        [action.player.id]: action.player,
      };
    }

    case DECREMENT_PLAYER_GEAR:
    case DECREMENT_PLAYER_LEVEL:
    case INCREMENT_PLAYER_GEAR:
    case INCREMENT_PLAYER_LEVEL:
    case KILL_PLAYER:
    case TOGGLE_PLAYER_SEX: {
      const player = playerReducer(state[action.id], action);

      return {
        ...state,
        [player.id]: player,
      };
    }

    case REMOVE_PLAYERS:
      return Object.fromEntries(
        Object.entries(state).filter(([id]) => !action.playerList.includes(id))
      );

    case RESET_PLAYERS: {
      return action.playerList.reduce((acc, id) => {
        const player = state[id];

        return {
          ...acc,
          [id]: {
            ...player,
            gear: 0,
            level: 1,
          },
        };
      }, state);
    }

    case UPDATE_PLAYER: {
      const { id } = action.player;
      const player = playerReducer(state[id], action);

      return {
        ...state,
        [id]: player,
      };
    }

    default:
      return state;
  }
};

export default reducer;
