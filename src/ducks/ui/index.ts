import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiInitialState = {
  selectedPlayerIds: string[];
};

export const initialState: UiInitialState = {
  selectedPlayerIds: [],
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    togglePlayer: (state, action: PayloadAction<string>) => {
      const { payload: id } = action;

      if (state.selectedPlayerIds.includes(id)) {
        return {
          ...state,
          selectedPlayerIds: state.selectedPlayerIds.filter(
            (selectedId) => selectedId !== id
          ),
        };
      }

      return {
        ...state,
        selectedPlayerIds: [...state.selectedPlayerIds, id],
      };
    },

    unselectAllPlayers: (state) => ({
      ...state,
      selectedPlayerIds: [],
    }),
  },
});

export const { togglePlayer, unselectAllPlayers } = uiSlice.actions;

export default uiSlice.reducer;
