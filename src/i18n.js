import { addLocaleData } from 'react-intl';

import deLocaleData from 'react-intl/locale-data/de';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import ruLocaleData from 'react-intl/locale-data/ru';
import ukLocaleData from 'react-intl/locale-data/uk';

import de from '../languages/de.json';
import en from '../languages/en.json';
import fr from '../languages/fr.json';
import ru from '../languages/ru.json';
import uk from '../languages/uk.json';

export const EN = 'en';
export const FR = 'fr';
export const RU = 'ru';
export const UK = 'uk';

const availableLocales = [EN, FR, RU, UK];

const defaultLocale = EN;

const LANGUAGE_LENGTH = 2;

addLocaleData([
  ...deLocaleData,
  ...enLocaleData,
  ...frLocaleData,
  ...ruLocaleData,
  ...ukLocaleData,
]);

export const getLocale = () => {
  const language = navigator.language || navigator.userLanguage;

  const locale = language.substr(0, LANGUAGE_LENGTH);

  return availableLocales.includes(locale) ? locale : defaultLocale;
};

export const getMessages = (locale) => {
  const allMessages = {
    de,
    en,
    fr,
    ru,
    uk,
  };

  return allMessages[locale] || allMessages[defaultLocale];
};
