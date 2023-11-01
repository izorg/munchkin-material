import { createAction } from "@reduxjs/toolkit";

import { type Monster } from "../../utils/types";

export const addMonster = createAction<Monster>("monsters/addMonster");

export const decrementMonsterBonus = createAction<string>(
  "monster/decrementMonsterBonus",
);

export const decrementMonsterLevel = createAction<string>(
  "monster/decrementMonsterLevel",
);

export const incrementMonsterBonus = createAction<string>(
  "monster/incrementMonsterBonus",
);

export const incrementMonsterLevel = createAction<string>(
  "monster/incrementMonsterLevel",
);

export const removeMonster = createAction<string>("monsters/removeMonster");
