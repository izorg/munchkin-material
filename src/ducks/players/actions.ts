import { createAction } from "@reduxjs/toolkit";

import { Player } from "../../utils/types";

export const addPlayer = createAction<Player>("players/addPlayer");

export const decrementPlayerGear = createAction<number>(
  "player/decrementPlayerGear"
);

export const decrementPlayerLevel = createAction<number>(
  "player/decrementPlayerLevel"
);

export const incrementPlayerGear = createAction<number>(
  "player/incrementPlayerGear"
);

export const incrementPlayerLevel = createAction<number>(
  "player/incrementPlayerLevel"
);

export const killPlayer = createAction<string>("player/killPlayer");

export const removePlayers = createAction<string[]>("players/removePlayers");

export const resetPlayers = createAction<string[]>("players/resetPlayers");

export const togglePlayerSex = createAction<string>("player/togglePlayerSex");

export const updatePlayer = createAction<Partial<Player>>(
  "player/updatePlayer"
);
