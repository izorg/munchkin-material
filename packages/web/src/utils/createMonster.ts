import { v4 as uuid } from "uuid";

import { type Monster } from "./types";

export const defaultData = {
  bonus: 0,
  level: 1,
};

const createMonster = (data?: Partial<Monster>): Monster => ({
  id: uuid(),
  ...defaultData,
  ...data,
});

export default createMonster;
