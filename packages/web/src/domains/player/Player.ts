import { type AvailableColor } from "../../utils/availableColors";

import { type Sex } from "./Sex";

export type Player = {
  color?: AvailableColor | null;
  gear: number;
  id: string;
  level: number;
  name: string;
  sex: Sex;
};
