export const Sex = {
  Female: "female",
  Male: "male",
} as const;

export type Sex = (typeof Sex)[keyof typeof Sex];
