export const CS = 'cs';
export const DA = 'da';
export const DE = 'de';
export const EL = 'el';
export const EN = 'en';
export const ES = 'es';
export const FR = 'fr';
export const HU = 'hu';
export const HY = 'hy';
export const IT = 'it';
export const NB = 'nb';
export const NL = 'nl';
export const PL = 'pl';
export const PT = 'pt';
export const RU = 'ru';
export const SK = 'sk';
export const UK = 'uk';

const loaders = {
  [CS]: () =>
    import(/* webpackChunkName: "locales/cs" */ '../languages/cs.json'),

  [DA]: () =>
    import(/* webpackChunkName: "locales/da" */ '../languages/da.json'),

  [DE]: () =>
    import(/* webpackChunkName: "locales/de" */ '../languages/de.json'),

  [EL]: () =>
    import(/* webpackChunkName: "locales/el" */ '../languages/el.json'),

  [EN]: () =>
    import(/* webpackChunkName: "locales/en" */ '../languages/en.json'),

  [ES]: () =>
    import(/* webpackChunkName: "locales/es" */ '../languages/es.json'),

  [FR]: () =>
    import(/* webpackChunkName: "locales/fr" */ '../languages/fr.json'),

  [HU]: () =>
    import(/* webpackChunkName: "locales/hu" */ '../languages/hu.json'),

  [HY]: () =>
    import(/* webpackChunkName: "locales/hy" */ '../languages/hy.json'),

  [IT]: () =>
    import(/* webpackChunkName: "locales/it" */ '../languages/it.json'),

  [NB]: () =>
    import(/* webpackChunkName: "locales/nb" */ '../languages/nb.json'),

  [NL]: () =>
    import(/* webpackChunkName: "locales/nl" */ '../languages/nl.json'),

  [PL]: () =>
    import(/* webpackChunkName: "locales/pl" */ '../languages/pl.json'),

  [PT]: () =>
    import(/* webpackChunkName: "locales/pt" */ '../languages/pt.json'),

  [RU]: () =>
    import(/* webpackChunkName: "locales/ru" */ '../languages/ru.json'),

  [SK]: () =>
    import(/* webpackChunkName: "locales/sk" */ '../languages/sk.json'),

  [UK]: () =>
    import(/* webpackChunkName: "locales/uk" */ '../languages/uk.json'),
};

const defaultLocale = EN;

const LANGUAGE_LENGTH = 2;

export const getLocale = () => {
  const languages =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language];

  const locales = languages.map((language) =>
    language.substr(0, LANGUAGE_LENGTH),
  );

  const locale = locales.find((item) => loaders[item]);

  return locale || defaultLocale;
};

let allMessages = {};

export const getMessages = (locale) => allMessages[locale];

export const loadLocale = async (locale) => {
  const { default: messages } = await loaders[locale]();

  allMessages = {
    ...allMessages,
    [locale]: messages,
  };

  return messages;
};
