import { createAction } from "@reduxjs/toolkit";

import { Player } from "../../utils/types";

export const addPlayer =
  createAction<Player, "players/addPlayer">("players/addPlayer");

export const decrementPlayerGear = createAction<
  string,
  "player/decrementPlayerGear"
>("player/decrementPlayerGear");

export const decrementPlayerLevel = createAction<
  string,
  "player/decrementPlayerLevel"
>("player/decrementPlayerLevel");

export const incrementPlayerGear = createAction<
  string,
  "player/incrementPlayerGear"
>("player/incrementPlayerGear");

export const incrementPlayerLevel = createAction<
  string,
  "player/incrementPlayerLevel"
>("player/incrementPlayerLevel");

export const killPlayer =
  createAction<string, "player/killPlayer">("player/killPlayer");

export const removePlayers = createAction<string[], "players/removePlayers">(
  "players/removePlayers"
);

export const resetPlayers = createAction<string[], "players/resetPlayers">(
  "players/resetPlayers"
);

export const togglePlayerSex = createAction<string, "player/togglePlayerSex">(
  "player/togglePlayerSex"
);

export const updatePlayer = createAction<
  Pick<Player, "id"> & Partial<Omit<Player, "id">>,
  "player/updatePlayer"
>("player/updatePlayer");
