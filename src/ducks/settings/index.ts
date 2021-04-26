import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import createPlayer from "../../utils/createPlayer";
import { startCombat } from "../combat";
import { addPlayer } from "../players";

type SettingsState = {
  epic: boolean;
  fullVersion: boolean;
  keepAwake: boolean;
  levelLimit: boolean;
  locale?: string;
  singleMode: boolean;
  singleModePlayerId?: string;
};

const initialState: SettingsState = {
  epic: false,
  fullVersion: false,
  keepAwake: false,
  levelLimit: false,
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

    setLocale: (state, action: PayloadAction<string>) => ({
      ...state,
      locale: action.payload,
    }),

    setSingleMode: (state, action: PayloadAction<boolean>) => ({
      ...state,
      singleMode: action.payload,
    }),

    setSingleModePlayer: (
      state,
      action: PayloadAction<string | undefined>
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
} = settingsSlice.actions;

export const setSingleMode = (singleMode: boolean) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  dispatch,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getState
): void => {
  if (singleMode) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    let { singleModePlayerId } = getState().present.settings;

    if (!singleModePlayerId) {
      const player = createPlayer();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      dispatch(addPlayer(player));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      dispatch(settingsSlice.actions.setSingleModePlayer(player.id));

      singleModePlayerId = player.id;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dispatch(startCombat(singleModePlayerId));
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  dispatch(settingsSlice.actions.setSingleMode(singleMode));
};

export default settingsSlice.reducer;
