import { createAction } from "@reduxjs/toolkit";

export const addPlayer = createAction("players/addPlayer");

export const decrementPlayerGear = createAction("player/decrementPlayerGear");

export const decrementPlayerLevel = createAction("player/decrementPlayerLevel");

export const incrementPlayerGear = createAction("player/incrementPlayerGear");

export const incrementPlayerLevel = createAction("player/incrementPlayerLevel");

export const killPlayer = createAction("player/killPlayer");

export const removePlayers = createAction("players/removePlayers");

export const resetPlayers = createAction("players/resetPlayers");

export const togglePlayerSex = createAction("player/togglePlayerSex");

export const updatePlayer = createAction("player/updatePlayer");
