import { createAction } from "@reduxjs/toolkit";

export const addPlayerToList = createAction("playerList/addPlayerToList");

export const movePlayer = createAction(
  "playerList/movePlayer",
  (oldPosition, newPosition) => ({
    payload: {
      newPosition,
      oldPosition,
    },
  })
);

export const shufflePlayers = createAction("playerList/shufflePlayers");
