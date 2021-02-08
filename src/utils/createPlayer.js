import { v4 as uuid } from "uuid";

import { MALE } from "./sex";

export const defaultData = {
  gear: 0,
  level: 1,
  sex: MALE,
};

const createPlayer = (data) => ({
  id: uuid(),
  ...defaultData,
  ...data,
});

export default createPlayer;
