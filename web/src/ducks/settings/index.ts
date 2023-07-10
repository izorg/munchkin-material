import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type SupportedLocale } from "../../i18n";

type SettingsState = {
  epic: boolean;
  fullVersion: boolean;
  keepAwake: boolean;
  levelLimit: boolean;
  locale?: SupportedLocale;
  singleMode: boolean;
  singleModePlayerId?: string;
};

const initialState: SettingsState = {
  epic: false,
  fullVersion: false,
  keepAwake: false,
  levelLimit: true,
  locale: undefined,
  singleMode: false,
  singleModePlayerId: undefined,
};

const settingsSlice = createSlice({
  initialState,
  name: "settings",
  reducers: {
    setEpic: (state, action: PayloadAction<boolean>) => ({
      ...state,
      epic: action.payload,
    }),

    setFullVersion: (state, action: PayloadAction<boolean>) => ({
      ...state,
      fullVersion: action.payload,
    }),

    setKeepAwake: (state, action: PayloadAction<boolean>) => ({
      ...state,
      keepAwake: action.payload,
    }),

    setLevelLimit: (state, action: PayloadAction<boolean>) => ({
      ...state,
      levelLimit: action.payload,
    }),

    setLocale: (state, action: PayloadAction<SupportedLocale>) => ({
      ...state,
      locale: action.payload,
    }),

    setSingleMode: (state, action: PayloadAction<boolean>) => ({
      ...state,
      singleMode: action.payload,
    }),

    setSingleModePlayer: (
      state,
      action: PayloadAction<string | undefined>,
    ) => ({
      ...state,
      singleModePlayerId: action.payload,
    }),
  },
});

export const {
  setEpic,
  setFullVersion,
  setKeepAwake,
  setLevelLimit,
  setLocale,
  setSingleMode,
  setSingleModePlayer,
} = settingsSlice.actions;

export default settingsSlice.reducer;
