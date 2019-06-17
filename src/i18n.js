export const DE = 'de';
export const EN = 'en';
export const ES = 'es';
export const FR = 'fr';
export const HU = 'hu';
export const IT = 'it';
export const PL = 'pl';
export const RU = 'ru';
export const UK = 'uk';

const availableLocales = { DE, EN, ES, FR, HU, IT, PL, RU, UK };

const defaultLocale = EN;

const LANGUAGE_LENGTH = 2;

export const getLocale = () => {
  const locale = navigator.language.substr(0, LANGUAGE_LENGTH);

  return Object.values(availableLocales).includes(locale)
    ? locale
    : defaultLocale;
};

let allMessages = {};

export const getMessages = (locale) => allMessages[locale];

const loaders = {
  [DE]: () =>
    import(/* webpackChunkName: "locales/de" */ '../languages/de.json'),

  [EN]: () =>
    import(/* webpackChunkName: "locales/en" */ '../languages/en.json'),

  [ES]: () =>
    import(/* webpackChunkName: "locales/es" */ '../languages/es.json'),

  [FR]: () =>
    import(/* webpackChunkName: "locales/fr" */ '../languages/fr.json'),

  [HU]: () =>
    import(/* webpackChunkName: "locales/hu" */ '../languages/hu.json'),

  [IT]: () =>
    import(/* webpackChunkName: "locales/fr" */ '../languages/it.json'),

  [PL]: () =>
    import(/* webpackChunkName: "locales/pl" */ '../languages/pl.json'),

  [RU]: () =>
    import(/* webpackChunkName: "locales/ru" */ '../languages/ru.json'),

  [UK]: () =>
    import(/* webpackChunkName: "locales/uk" */ '../languages/uk.json'),
};

export const loadLocale = async (locale) => {
  const messages = await loaders[locale]();

  allMessages = {
    ...allMessages,
    [locale]: messages,
  };

  return { messages };
};
