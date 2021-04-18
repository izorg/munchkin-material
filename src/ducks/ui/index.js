import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
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

    togglePlayer: (state, action) => {
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
