export type Monster = {
  bonus: number;
  id: string;
  level: number;
};

export type Player = {
  color?: string;
  gear: number;
  id: string;
  level: number;
  name: string;
  sex: Sex;
};

export enum Sex {
  Female = "female",
  Male = "male",
}
