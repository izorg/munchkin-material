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

export const isSupportedLocale = (
  locale: string,
): locale is SupportedLocale => {
  for (const supportedLocale of supportedLocales) {
    if (locale === supportedLocale) {
      return true;
    }
  }

  return false;
};

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
      (locale) => locale === language.slice(0, 2),
    );

    if (currentLocale) {
      return currentLocale;
    }
  }

  return EN;
};

const loaders = {
  [CS]: () => import("../l10n/translations/generated/cs.json"),
  [DA]: () => import("../l10n/translations/generated/da.json"),
  [DE]: () => import("../l10n/translations/generated/de.json"),
  [EL]: () => import("../l10n/translations/generated/el.json"),
  [EN]: () => import("../l10n/translations/generated/en.json"),
  [ES]: () => import("../l10n/translations/generated/es.json"),
  [FI]: () => import("../l10n/translations/generated/fi.json"),
  [FR]: () => import("../l10n/translations/generated/fr.json"),
  [HE]: () => import("../l10n/translations/generated/he.json"),
  [HU]: () => import("../l10n/translations/generated/hu.json"),
  [HY]: () => import("../l10n/translations/generated/hy.json"),
  [IT]: () => import("../l10n/translations/generated/it.json"),
  [NB]: () => import("../l10n/translations/generated/nb.json"),
  [NL]: () => import("../l10n/translations/generated/nl.json"),
  [PL]: () => import("../l10n/translations/generated/pl.json"),
  [PT]: () => import("../l10n/translations/generated/pt.json"),
  [PT_BR]: () => import("../l10n/translations/generated/pt-BR.json"),
  [RU]: () => import("../l10n/translations/generated/ru.json"),
  [SK]: () => import("../l10n/translations/generated/sk.json"),
  [TR]: () => import("../l10n/translations/generated/tr.json"),
  [UK]: () => import("../l10n/translations/generated/uk.json"),
};

export const loadMessages = async (
  locale: SupportedLocale,
): Promise<Record<string, MessageFormatElement[]> | Record<string, string>> => {
  const messages = await loaders[locale]();

  return messages.default ?? messages;
};
