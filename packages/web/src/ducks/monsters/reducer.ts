import { createReducer, isAnyOf } from "@reduxjs/toolkit";

import { type Monster } from "../../utils/types";
import { startCombat } from "../combat";

import {
  addMonster,
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
  removeMonster,
} from "./actions";

export const monsterReducer = (
  state: Monster,
  action: ReturnType<
    | typeof decrementMonsterBonus
    | typeof decrementMonsterLevel
    | typeof incrementMonsterBonus
    | typeof incrementMonsterLevel
  >,
): Monster => {
  switch (action.type) {
    case decrementMonsterBonus.type: {
      return {
        ...state,
        bonus: state.bonus - 1,
      };
    }

    case decrementMonsterLevel.type: {
      return {
        ...state,
        level: state.level - 1,
      };
    }

    case incrementMonsterBonus.type: {
      return {
        ...state,
        bonus: state.bonus + 1,
      };
    }

    case incrementMonsterLevel.type: {
      return {
        ...state,
        level: state.level + 1,
      };
    }
  }
};

export const initialState: Record<string, Monster> = {};

const monstersReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(addMonster, (state, action) => ({
      ...state,
      [action.payload.id]: action.payload,
    }))
    .addCase(removeMonster, (state, action) => {
      const copy = { ...state };

      delete copy[action.payload];

      return copy;
    })
    .addCase(startCombat, (state, action) => ({
      [action.payload.monster.id]: action.payload.monster,
    }))
    .addMatcher(
      isAnyOf(
        decrementMonsterBonus,
        decrementMonsterLevel,
        incrementMonsterBonus,
        incrementMonsterLevel,
      ),
      (state, action) => {
        const monster = monsterReducer(state[action.payload], action);

        return {
          ...state,
          [monster.id]: monster,
        };
      },
    ),
);

export default monstersReducer;
