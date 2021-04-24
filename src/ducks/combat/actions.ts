import { createAction, PrepareAction } from "@reduxjs/toolkit";

import createMonster from "../../utils/createMonster";
import { Monster } from "../../utils/types";

export const finishCombat = createAction("combat/finishCombat");

export const setCombatHelper = createAction<string>("combat/setCombatHelper");

export const setCombatHelperBonus = createAction<number>(
  "combat/setCombatHelperBonus"
);

export const setCombatPlayerBonus = createAction<number>(
  "combat/setCombatPlayerBonus"
);

export const startCombat = createAction<
  PrepareAction<{ monster: Monster; playerId: string }>
>("combat/startCombat", (playerId: string) => ({
  payload: {
    monster: createMonster(),
    playerId,
  },
}));
