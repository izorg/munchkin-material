import { createSlice } from "@reduxjs/toolkit";

import { key as id } from "../../theme/colors/munchkin";

export const initialState = {
  id,
  mode: undefined,
  pureBlack: false,
};

const themeSlice = createSlice({
  initialState,
  name: "theme",
  reducers: {
    setTheme: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
