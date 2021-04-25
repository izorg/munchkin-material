export type Monster = {
  bonus: number;
  id: string;
  level: number;
};

export type Player = {
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
