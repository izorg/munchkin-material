import { createAction } from "@reduxjs/toolkit";

import { type Monster } from "../../utils/types";

export const addMonster = createAction<Monster, "monsters/addMonster">(
  "monsters/addMonster",
);

export const decrementMonsterBonus = createAction<
  string,
  "monster/decrementMonsterBonus"
>("monster/decrementMonsterBonus");

export const decrementMonsterLevel = createAction<
  string,
  "monster/decrementMonsterLevel"
>("monster/decrementMonsterLevel");

export const incrementMonsterBonus = createAction<
  string,
  "monster/incrementMonsterBonus"
>("monster/incrementMonsterBonus");

export const incrementMonsterLevel = createAction<
  string,
  "monster/incrementMonsterLevel"
>("monster/incrementMonsterLevel");

export const removeMonster = createAction<string, "monsters/removeMonster">(
  "monsters/removeMonster",
);
