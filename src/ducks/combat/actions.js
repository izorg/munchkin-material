import { createAction } from "@reduxjs/toolkit";

import createMonster from "../../utils/createMonster";

export const finishCombat = createAction("combat/finishCombat");

export const setCombatHelper = createAction("combat/setCombatHelper");

export const setCombatHelperBonus = createAction("combat/setCombatHelperBonus");

export const setCombatPlayerBonus = createAction("combat/setCombatPlayerBonus");

export const startCombat = createAction("combat/startCombat", (playerId) => ({
  payload: {
    monster: createMonster(),
    playerId,
  },
}));
