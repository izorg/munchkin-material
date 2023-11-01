import { v4 as uuid } from "uuid";

import { type Player, Sex } from "./types";

export const defaultData = {
  gear: 0,
  level: 1,
  name: "",
  sex: Sex.Male,
};

const createPlayer = (data?: Partial<Player>): Player => ({
  id: uuid(),
  ...defaultData,
  ...data,
});

export default createPlayer;
