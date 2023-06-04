import { type MessageFormatElement } from "react-intl";

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
] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const isSupportedLocale = (locale: string): locale is SupportedLocale =>
  Boolean(supportedLocales.find((item) => item === locale));

export const getLocale = () => {
  const languages = navigator?.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of languages) {
    const locale = supportedLocales.find((item) => item === language);

    if (locale) {
      return locale;
    }

    const currentLocale = supportedLocales.find(
      (locale) => locale === language.slice(0, 2)
    );

    if (currentLocale) {
      return currentLocale;
    }
  }

  return EN;
};

const loaders = {
  [CS]: () => import("../../languages/generated/cs.json"),
  [DA]: () => import("../../languages/generated/da.json"),
  [DE]: () => import("../../languages/generated/de.json"),
  [EL]: () => import("../../languages/generated/el.json"),
  [EN]: () => import("../../languages/generated/en.json"),
  [ES]: () => import("../../languages/generated/es.json"),
  [FI]: () => import("../../languages/generated/fi.json"),
  [FR]: () => import("../../languages/generated/fr.json"),
  [HE]: () => import("../../languages/generated/he.json"),
  [HU]: () => import("../../languages/generated/hu.json"),
  [HY]: () => import("../../languages/generated/hy.json"),
  [IT]: () => import("../../languages/generated/it.json"),
  [NB]: () => import("../../languages/generated/nb.json"),
  [NL]: () => import("../../languages/generated/nl.json"),
  [PL]: () => import("../../languages/generated/pl.json"),
  [PT]: () => import("../../languages/generated/pt.json"),
  [PT_BR]: () => import("../../languages/generated/pt-BR.json"),
  [RU]: () => import("../../languages/generated/ru.json"),
  [SK]: () => import("../../languages/generated/sk.json"),
  [TR]: () => import("../../languages/generated/tr.json"),
  [UK]: () => import("../../languages/generated/uk.json"),
};

export const loadMessages = async (
  locale: SupportedLocale
): Promise<Record<string, string> | Record<string, MessageFormatElement[]>> => {
  const messages = await loaders[locale]();

  return messages.default ?? messages;
};
