import { createReducer, isAnyOf } from "@reduxjs/toolkit";

import { startCombat } from "../combat";

import {
  addMonster,
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
  removeMonster,
} from "./actions";

export const monsterReducer = (state, action) => {
  switch (action.type) {
    case decrementMonsterBonus.type:
      return {
        ...state,
        bonus: state.bonus - 1,
      };

    case decrementMonsterLevel.type:
      return {
        ...state,
        level: state.level - 1,
      };

    case incrementMonsterBonus.type:
      return {
        ...state,
        bonus: state.bonus + 1,
      };

    case incrementMonsterLevel.type:
      return {
        ...state,
        level: state.level + 1,
      };

    default:
      return state;
  }
};

export const initialState = {};

const monstersReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(addMonster, (state, action) => ({
      ...state,
      [action.payload.id]: action.payload,
    }))
    .addCase(removeMonster, (state, action) => {
      const { [action.payload]: removed, ...rest } = state;

      return rest;
    })
    .addCase(startCombat, (state, action) => ({
      [action.payload.monster.id]: action.payload.monster,
    }))
    .addMatcher(
      isAnyOf(
        decrementMonsterBonus,
        decrementMonsterLevel,
        incrementMonsterBonus,
        incrementMonsterLevel
      ),
      (state, action) => {
        const monster = monsterReducer(state[action.payload], action);

        return {
          ...state,
          [monster.id]: monster,
        };
      }
    )
);

export default monstersReducer;
