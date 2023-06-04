import { createReducer, isAnyOf } from "@reduxjs/toolkit";

import toggleSex from "../../utils/toggleSex";
import { type Player } from "../../utils/types";

import {
  addPlayer,
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  killPlayer,
  removePlayers,
  resetPlayers,
  togglePlayerSex,
  updatePlayer,
} from "./actions";

export const playerReducer = (
  state: Player,
  action: ReturnType<
    | typeof decrementPlayerGear
    | typeof decrementPlayerLevel
    | typeof incrementPlayerGear
    | typeof incrementPlayerLevel
    | typeof killPlayer
    | typeof togglePlayerSex
  >
): Player => {
  switch (action.type) {
    case decrementPlayerGear.type: {
      return {
        ...state,
        gear: state.gear - 1,
      };
    }

    case decrementPlayerLevel.type: {
      return {
        ...state,
        level: state.level - 1,
      };
    }

    case incrementPlayerGear.type: {
      return {
        ...state,
        gear: state.gear + 1,
      };
    }

    case incrementPlayerLevel.type: {
      return {
        ...state,
        level: state.level + 1,
      };
    }

    case killPlayer.type: {
      return {
        ...state,
        gear: 0,
      };
    }

    case togglePlayerSex.type: {
      return {
        ...state,
        sex: toggleSex(state.sex),
      };
    }
  }
};

export const initialState: Record<string, Player> = {};

const playersReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(addPlayer, (state, action) => ({
      ...state,
      [action.payload.id]: action.payload,
    }))
    .addCase(removePlayers, (state, action) =>
      Object.fromEntries(
        Object.entries(state).filter(([id]) => !action.payload.includes(id))
      )
    )
    .addCase(resetPlayers, (state, action) =>
      action.payload.reduce((acc, id) => {
        const player = state[id];

        return {
          ...acc,
          [id]: {
            ...player,
            gear: 0,
            level: 1,
          },
        };
      }, state)
    )
    .addCase(updatePlayer, (state, action) => {
      const { id } = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id],
          ...action.payload,
        },
      };
    })
    .addMatcher(
      isAnyOf(
        decrementPlayerGear,
        decrementPlayerLevel,
        incrementPlayerGear,
        incrementPlayerLevel,
        killPlayer,
        togglePlayerSex
      ),
      (state, action) => {
        const player = playerReducer(state[action.payload], action);

        return {
          ...state,
          [player.id]: player,
        };
      }
    )
);

export default playersReducer;
