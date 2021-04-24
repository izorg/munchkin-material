import { createAction, PrepareAction } from "@reduxjs/toolkit";

export const addPlayerToList = createAction<string>(
  "playerList/addPlayerToList"
);

export const movePlayer = createAction<
  PrepareAction<{ newPosition: number; oldPosition: number }>
>("playerList/movePlayer", (oldPosition: number, newPosition: number) => ({
  payload: {
    newPosition,
    oldPosition,
  },
}));

export const shufflePlayers = createAction("playerList/shufflePlayers");
