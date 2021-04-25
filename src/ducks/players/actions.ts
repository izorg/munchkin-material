import { createAction } from "@reduxjs/toolkit";

import { Player } from "../../utils/types";

export const addPlayer = createAction<Player>("players/addPlayer");

export const decrementPlayerGear = createAction<string>(
  "player/decrementPlayerGear"
);

export const decrementPlayerLevel = createAction<string>(
  "player/decrementPlayerLevel"
);

export const incrementPlayerGear = createAction<string>(
  "player/incrementPlayerGear"
);

export const incrementPlayerLevel = createAction<string>(
  "player/incrementPlayerLevel"
);

export const killPlayer = createAction<string>("player/killPlayer");

export const removePlayers = createAction<string[]>("players/removePlayers");

export const resetPlayers = createAction<string[]>("players/resetPlayers");

export const togglePlayerSex = createAction<string>("player/togglePlayerSex");

export const updatePlayer = createAction<
  Pick<Player, "id"> & Partial<Omit<Player, "id">>
>("player/updatePlayer");
