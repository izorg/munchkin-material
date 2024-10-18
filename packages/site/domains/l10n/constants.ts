export const LOCALE = {
  EN: "en",
  RU: "ru",
} as const;

export type LOCALE = (typeof LOCALE)[keyof typeof LOCALE];
