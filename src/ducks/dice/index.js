import { createSlice } from "@reduxjs/toolkit";

export const initialState = null;

export const diceSlice = createSlice({
  initialState,
  name: "dice",
  reducers: {
    throwDice: {
      prepare: () => ({
        payload: Math.floor(Math.random() * 6) + 1,
      }),
      reducer: (state, action) => action.payload,
    },
  },
});

export const { throwDice } = diceSlice.actions;

export default diceSlice.reducer;
