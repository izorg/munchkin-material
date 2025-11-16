export const BE = "be";
export const CS = "cs";
export const DA = "da";
export const DE = "de";
export const EL = "el";
export const EN = "en";
export const ES = "es";
export const FI = "fi";
export const FR = "fr";
export const HE = "he";
export const HU = "hu";
export const HY = "hy";
export const IT = "it";
export const NB = "nb";
export const NL = "nl";
export const PL = "pl";
export const PT = "pt";
export const PT_BR = "pt-BR";
export const RU = "ru";
export const SK = "sk";
export const TR = "tr";
export const UK = "uk";

export const supportedLocales = [
  BE,
  CS,
  DA,
  DE,
  EL,
  EN,
  ES,
  FI,
  FR,
  HE,
  HU,
  HY,
  IT,
  NB,
  NL,
  PL,
  PT,
  PT_BR,
  RU,
  SK,
  TR,
  UK,
] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const isSupportedLocale = (
  locale: string,
): locale is SupportedLocale => {
  /* istanbul ignore next */
  for (const supportedLocale of supportedLocales) {
    if (locale === supportedLocale) {
      return true;
    }
  }

  /* istanbul ignore next */
  return false;
};
