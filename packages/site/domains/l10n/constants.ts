export const LOCALE = {
  DE: "de",
  EN: "en",
  RU: "ru",
} as const;

export type LOCALE = (typeof LOCALE)[keyof typeof LOCALE];
