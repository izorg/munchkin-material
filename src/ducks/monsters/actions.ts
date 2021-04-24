import { createAction } from "@reduxjs/toolkit";

import { Monster } from "../../utils/types";

export const addMonster = createAction<Monster>("monsters/addMonster");

export const decrementMonsterBonus = createAction<number>(
  "monster/decrementMonsterBonus"
);

export const decrementMonsterLevel = createAction<number>(
  "monster/decrementMonsterLevel"
);

export const incrementMonsterBonus = createAction<number>(
  "monster/incrementMonsterBonus"
);

export const incrementMonsterLevel = createAction<number>(
  "monster/incrementMonsterLevel"
);

export const removeMonster = createAction<string>("monsters/removeMonster");
