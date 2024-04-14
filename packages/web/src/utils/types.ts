import { type AvailableColor } from "./availableColors";

export type Monster = {
  bonus: number;
  id: string;
  level: number;
};

export type Player = {
  color?: AvailableColor | null;
  gear: number;
  id: string;
  level: number;
  name: string;
  sex: Sex;
};

export const Sex = {
  Female: "female",
  Male: "male",
} as const;

export type Sex = (typeof Sex)[keyof typeof Sex];
