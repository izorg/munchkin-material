import { addLocaleData } from 'react-intl';

export const DE = 'de';
export const EN = 'en';
export const FR = 'fr';
export const RU = 'ru';
export const UK = 'uk';

export const availableLocales = [DE, EN, FR, RU, UK];

const defaultLocale = EN;

const LANGUAGE_LENGTH = 2;

export const getLocale = () => {
  const language = navigator.language || navigator.userLanguage;

  const locale = language.substr(0, LANGUAGE_LENGTH);

  return availableLocales.includes(locale) ? locale : defaultLocale;
};

let allMessages = {};

export const getMessages = (locale) => allMessages[locale];

const loaders = {
  [DE]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/de" */ 'react-intl/locale-data/de'),
      import(/* webpackChunkName: "locales/de" */ '../languages/de.json'),
    ]),

  [FR]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/fr" */ 'react-intl/locale-data/fr'),
      import(/* webpackChunkName: "locales/fr" */ '../languages/fr.json'),
    ]),

  [EN]: () =>
    Promise.all([
      import(/* webpackChunkName: "locales/en" */ 'react-intl/locale-data/en'),
      import(/* webpackChunkName: "locales/en" */ '../languages/en.json'),
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
