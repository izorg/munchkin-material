import { createReducer } from "@reduxjs/toolkit";

import { addMonster, removeMonster } from "../monsters";
import { removePlayers } from "../players";

import {
  finishCombat,
  setCombatHelper,
  setCombatHelperBonus,
  setCombatPlayerBonus,
  startCombat,
} from "./actions";

type InitialState = {
  finished: boolean;
  helperBonus: number;
  helperId: null | string;
  monsters: string[];
  playerBonus: number;
  playerId: null | string;
};

export const initialState: InitialState = {
  finished: false,
  helperBonus: 0,
  helperId: null,
  monsters: [],
  playerBonus: 0,
  playerId: null,
};

const combatReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(addMonster, (state, action) => ({
      ...state,
      monsters: [...state.monsters, action.payload.id],
    }))
    .addCase(finishCombat, (state) => ({
      ...state,
      finished: true,
    }))
    .addCase(setCombatHelper, (state, action) => ({
      ...state,
      helperId: action.payload,
    }))
    .addCase(setCombatHelperBonus, (state, action) => ({
      ...state,
      helperBonus: action.payload,
    }))
    .addCase(setCombatPlayerBonus, (state, action) => ({
      ...state,
      playerBonus: action.payload,
    }))
    .addCase(removeMonster, (state, action) => {
      const { monsters, ...rest } = state;
      const index = monsters.indexOf(action.payload);

      return {
        ...rest,
        monsters: [...monsters.slice(0, index), ...monsters.slice(index + 1)],
      };
    })
    .addCase(removePlayers, (state, action) => {
      if (state.helperId && action.payload.includes(state.helperId)) {
        return {
          ...state,
          helperBonus: 0,
          helperId: null,
        };
      }

      return state;
    })
    .addCase(startCombat, (state, action) => ({
      ...initialState,
      finished: false,
      monsters: [action.payload.monster.id],
      playerId: action.payload.playerId,
    }))
);

export default combatReducer;
