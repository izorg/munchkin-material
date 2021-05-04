import type { IntlConfig } from "react-intl";

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

export const getDirection = (locale: string): "ltr" | "rtl" =>
  [HE].includes(locale) ? "rtl" : "ltr";

const supportedLocales = [
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
];

export const getLocale = (): string => {
  const languages = navigator?.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of languages) {
    if (supportedLocales.includes(language)) {
      return language;
    }

    const currentLocale = supportedLocales.find(
      (locale) => locale === language.substring(0, 2)
    );

    if (currentLocale) {
      return currentLocale;
    }
  }

  return EN;
};

export const loadMessages = async (
  locale: string
): Promise<IntlConfig["messages"]> => {
  const publicPath = "cordova" in window ? "" : "/";

  const res = await fetch(`${publicPath}languages/${locale}.json`);

  return (await res.json()) as IntlConfig["messages"];
};
