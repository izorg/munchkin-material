import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiInitialState = {
  menuCollapsed: boolean;
  selectedPlayerIds: string[];
};

export const initialState: UiInitialState = {
  menuCollapsed: true,
  selectedPlayerIds: [],
};

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    toggleMenu: (state) => ({
      ...state,
      menuCollapsed: !state.menuCollapsed,
    }),

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

export const { toggleMenu, togglePlayer, unselectAllPlayers } = uiSlice.actions;

export default uiSlice.reducer;
