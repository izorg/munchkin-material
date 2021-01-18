export const CS = 'cs';
export const DA = 'da';
export const DE = 'de';
export const EL = 'el';
export const EN = 'en';
export const ES = 'es';
export const FI = 'fi';
export const FR = 'fr';
export const HE = 'he';
export const HU = 'hu';
export const HY = 'hy';
export const IT = 'it';
export const NB = 'nb';
export const NL = 'nl';
export const PL = 'pl';
export const PT = 'pt';
export const PT_BR = 'pt-BR';
export const RU = 'ru';
export const SK = 'sk';
export const TR = 'tr';
export const UK = 'uk';

const loaders = {
  [CS]: () => import('../languages/cs.json'),

  [DA]: () => import('../languages/da.json'),

  [DE]: () => import('../languages/de.json'),

  [EL]: () => import('../languages/el.json'),

  [EN]: () => import('../languages/en.json'),

  [ES]: () => import('../languages/es.json'),

  [FI]: () => import('../languages/fi.json'),

  [FR]: () => import('../languages/fr.json'),

  [HE]: () => import('../languages/he.json'),

  [HU]: () => import('../languages/hu.json'),

  [HY]: () => import('../languages/hy.json'),

  [IT]: () => import('../languages/it.json'),

  [NB]: () => import('../languages/nb.json'),

  [NL]: () => import('../languages/nl.json'),

  [PL]: () => import('../languages/pl.json'),

  [PT]: () => import('../languages/pt.json'),

  [PT_BR]: () => import('../languages/pt-BR.json'),

  [RU]: () => import('../languages/ru.json'),

  [SK]: () => import('../languages/sk.json'),

  [TR]: () => import('../languages/tr.json'),

  [UK]: () => import('../languages/uk.json'),
};

export const getDirection = (locale) => ([HE].includes(locale) ? 'rtl' : 'ltr');

const supportedLocales = Object.keys(loaders);

export const getLocale = () => {
  const languages = navigator?.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of languages) {
    const currentLocale = supportedLocales.find(
      (locale) => locale === language || locale === language.substring(0, 2),
    );

    if (currentLocale) {
      return currentLocale;
    }
  }

  return EN;
};

export const loadMessages = async (locale) => {
  const { default: messages } = await loaders[locale]();

  return messages;
};
