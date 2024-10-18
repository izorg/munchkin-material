export const LANGUAGE = {
  EN: "en",
  RU: "ru",
} as const;

export type LANGUAGE = (typeof LANGUAGE)[keyof typeof LANGUAGE];
