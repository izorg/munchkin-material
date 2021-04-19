import { createAction } from "@reduxjs/toolkit";

export const addMonster = createAction("monsters/addMonster");

export const decrementMonsterBonus = createAction(
  "monster/decrementMonsterBonus"
);

export const decrementMonsterLevel = createAction(
  "monster/decrementMonsterLevel"
);

export const incrementMonsterBonus = createAction(
  "monster/incrementMonsterBonus"
);

export const incrementMonsterLevel = createAction(
  "monster/incrementMonsterLevel"
);

export const removeMonster = createAction("monsters/removeMonster");
