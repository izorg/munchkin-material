import { addLocaleData } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';
import ruLocaleData from 'react-intl/locale-data/ru';
import ukLocaleData from 'react-intl/locale-data/uk';

import en from '../languages/en.json';
import ru from '../languages/ru.json';
import uk from '../languages/uk.json';

const avaliableLocales = [
  'en',
  'ru',
  'uk',
];

const defaultLocale = 'en';

const LANGUAGE_LENGTH = 2;

addLocaleData([
  ...enLocaleData,
  ...ruLocaleData,
  ...ukLocaleData,
]);

export const getLocale = () => {
  const language = navigator.language || navigator.userLanguage;

  const locale = language.substr(0, LANGUAGE_LENGTH);

  return avaliableLocales.includes(locale) ? locale : defaultLocale;
};

export const getMessages = (locale) => {
  const allMessages = {
    en,
    ru,
    uk,
  };

  return allMessages[locale] || allMessages[defaultLocale];
};
