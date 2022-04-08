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

const loaders: Record<
  string,
  () => Promise<{ default: Record<string, string> }>
> = {
  [CS]: () => import("../languages/cs.json"),
  [DA]: () => import("../languages/da.json"),
  [DE]: () => import("../languages/de.json"),
  [EL]: () => import("../languages/el.json"),
  [EN]: () => import("../languages/en.json"),
  [ES]: () => import("../languages/es.json"),
  [FI]: () => import("../languages/fi.json"),
  [FR]: () => import("../languages/fr.json"),
  [HE]: () => import("../languages/he.json"),
  [HU]: () => import("../languages/hu.json"),
  [HY]: () => import("../languages/hy.json"),
  [IT]: () => import("../languages/it.json"),
  [NB]: () => import("../languages/nb.json"),
  [NL]: () => import("../languages/nl.json"),
  [PL]: () => import("../languages/pl.json"),
  [PT]: () => import("../languages/pt.json"),
  [PT_BR]: () => import("../languages/pt-BR.json"),
  [RU]: () => import("../languages/ru.json"),
  [SK]: () => import("../languages/sk.json"),
  [TR]: () => import("../languages/tr.json"),
  [UK]: () => import("../languages/uk.json"),
};

export const loadMessages = async (locale: string) => {
  const loader = loaders[locale];

  if (!loader) {
    throw new Error(`Locale ${locale} is not supported`);
  }

  const { default: messages } = await loader();

  return messages;
};
