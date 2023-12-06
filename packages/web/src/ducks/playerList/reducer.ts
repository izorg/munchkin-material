import { createReducer } from "@reduxjs/toolkit";

import { getRandomInt } from "../../utils/getRandomInt";
import { removePlayers } from "../players";

import { addPlayerToList, movePlayer, shufflePlayers } from "./actions";

// https://github.com/lodash/lodash/blob/master/shuffle.js
const shuffle = (array: string[]): string[] => {
  const { length } = array;

  let index = 0;
  const lastIndex = length - 1;
  const result = [...array];

  while (index < length) {
    const rand = getRandomInt(index, lastIndex);
    const value = result[rand];

    result[rand] = result[index];
    result[index] = value;

    index += 1;
  }

  return result;
};

const initialState: string[] = [];

const playerListReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(addPlayerToList, (state, action) => [...state, action.payload])
    .addCase(movePlayer, (state, action) => {
      const { newPosition, oldPosition } = action.payload;
      const movedPlayer = state[oldPosition];
      const playersWithoutMoved = [
        ...state.slice(0, oldPosition),
        ...state.slice(oldPosition + 1),
      ];

      return [
        ...playersWithoutMoved.slice(0, newPosition),
        movedPlayer,
        ...playersWithoutMoved.slice(newPosition),
      ];
    })
    .addCase(removePlayers, (state, action) =>
      state.filter((id) => !action.payload.includes(id)),
    )
    .addCase(shufflePlayers, shuffle),
);

export default playerListReducer;
