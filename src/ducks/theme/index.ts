import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { key as id } from "../../theme/colors/munchkin";

export type ThemeState = {
  id: string;
  mode?: "light" | "dark";
  pureBlack: boolean;
};

export const initialState: ThemeState = {
  id,
  mode: undefined,
  pureBlack: false,
};

const themeSlice = createSlice({
  initialState,
  name: "theme",
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
