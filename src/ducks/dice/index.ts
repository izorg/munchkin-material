import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState = null;

export const diceSlice = createSlice({
  initialState: initialState as null | number,
  name: "dice",
  reducers: {
    throwDice: {
      prepare: () => ({
        payload: Math.floor(Math.random() * 6) + 1,
      }),
      reducer: (state, action: PayloadAction<number>) => action.payload,
    },
  },
});

export const { throwDice } = diceSlice.actions;

export default diceSlice.reducer;
