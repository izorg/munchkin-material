import { createSlice } from "@reduxjs/toolkit";

import createPlayer from "../../utils/createPlayer";
import { startCombat } from "../combat";
import { addPlayer } from "../players";

const initialState = {
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
    setEpic: (state, action) => ({
      ...state,
      epic: action.payload,
    }),

    setFullVersion: (state, action) => ({
      ...state,
      fullVersion: action.payload,
    }),

    setKeepAwake: (state, action) => ({
      ...state,
      keepAwake: action.payload,
    }),

    setLevelLimit: (state, action) => ({
      ...state,
      levelLimit: action.payload,
    }),

    setLocale: (state, action) => ({
      ...state,
      locale: action.payload,
    }),

    setSingleMode: (state, action) => ({
      ...state,
      singleMode: action.payload,
    }),

    setSingleModePlayer: (state, action) => ({
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

export const setSingleMode = (singleMode) => async (dispatch, getState) => {
  if (singleMode) {
    let { singleModePlayerId } = getState().present.settings;

    if (!singleModePlayerId) {
      const player = createPlayer();

      dispatch(addPlayer(player));
      dispatch(settingsSlice.actions.setSingleModePlayer(player.id));

      singleModePlayerId = player.id;
    }

    dispatch(startCombat(singleModePlayerId));
  }

  dispatch(settingsSlice.actions.setSingleMode(singleMode));
};

export default settingsSlice.reducer;
