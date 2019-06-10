import { addLocaleData } from 'react-intl';

export const DE = 'de';
export const EN = 'en';
export const ES = 'es';
export const FR = 'fr';
export const IT = 'it';
export const PL = 'pl';
export const RU = 'ru';
export const UK = 'uk';

const availableLocales = { DE, EN, ES, FR, IT, PL, RU, UK };

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
    Promise.all([
      import(/* webpackChunkName: "locales/de" */ 'react-intl/locale-data/de'),
      import(/* webpackChunkName: "locales/de" */ '../languages/de.json'),
    ]),

  [EN]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/en" */ 'react-intl/locale-data/en'),
      import(/* webpackChunkName: "locales/en" */ '../languages/en.json'),
    ]),

  [ES]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/es" */ 'react-intl/locale-data/es'),
      import(/* webpackChunkName: "locales/es" */ '../languages/es.json'),
    ]),

  [FR]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/fr" */ 'react-intl/locale-data/fr'),
      import(/* webpackChunkName: "locales/fr" */ '../languages/fr.json'),
    ]),

  [IT]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/fr" */ 'react-intl/locale-data/it'),
      import(/* webpackChunkName: "locales/fr" */ '../languages/it.json'),
    ]),

  [PL]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/pl" */ 'react-intl/locale-data/pl'),
      import(/* webpackChunkName: "locales/pl" */ '../languages/pl.json'),
    ]),

  [RU]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/ru" */ 'react-intl/locale-data/ru'),
      import(/* webpackChunkName: "locales/ru" */ '../languages/ru.json'),
    ]),

  [UK]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/uk" */ 'react-intl/locale-data/uk'),
      import(/* webpackChunkName: "locales/uk" */ '../languages/uk.json'),
    ]),
};

export const loadLocale = async (locale) => {
  const [intlLocale, messages] = await loaders[locale]();

  addLocaleData(intlLocale.default);

  allMessages = {
    ...allMessages,
    [locale]: messages,
  };

  return { messages };
};
