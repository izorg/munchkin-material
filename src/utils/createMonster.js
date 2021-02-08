import { v4 as uuid } from "uuid";

export const defaultData = {
  bonus: 0,
  level: 1,
};

const createMonster = (data) => ({
  id: uuid(),
  ...defaultData,
  ...data,
});

export default createMonster;
