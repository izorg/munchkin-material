import { addLocaleData } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';
import ruLocaleData from 'react-intl/locale-data/ru';

import en from '../languages/en.json';
import ru from '../languages/ru.json';

addLocaleData([...enLocaleData, ...ruLocaleData]);

const LANGUAGE_LENGTH = 2;

export const getLocale = () => {
  const language = navigator.language || navigator.userLanguage;

  return language.substr(0, LANGUAGE_LENGTH);
};

export const getMessages = () => {
  const allMessages = {
    en,
    ru,
  };

  return allMessages[getLocale()];
};
