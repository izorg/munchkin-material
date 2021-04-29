import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export const initialState = null;

export const diceSlice = createSlice({
  initialState: initialState as DiceValue | null,
  name: "dice",
  reducers: {
    throwDice: {
      prepare: () => ({
        payload: (Math.floor(Math.random() * 6) + 1) as DiceValue,
      }),
      reducer: (state, action: PayloadAction<DiceValue>) => action.payload,
    },
  },
});

export const { throwDice } = diceSlice.actions;

export default diceSlice.reducer;
