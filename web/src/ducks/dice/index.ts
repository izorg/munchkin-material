import { createSlice } from "@reduxjs/toolkit";

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

// Use `as` to correct state type https://redux-toolkit.js.org/tutorials/typescript#define-slice-state-and-action-types
export const initialState = null as DiceValue | null;

const getRandomDice = () => (Math.floor(Math.random() * 6) + 1) as DiceValue;

export const diceSlice = createSlice({
  initialState,
  name: "dice",
  reducers: {
    throwDice: getRandomDice,
  },
});

export const { throwDice } = diceSlice.actions;

export default diceSlice.reducer;
