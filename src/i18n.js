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
  [CS]: () =>
    import(
      /* webpackChunkName: "locales/cs" */
      '../languages/compiled/cs.json'
    ),

  [DA]: () =>
    import(
      /* webpackChunkName: "locales/da" */
      '../languages/compiled/da.json'
    ),

  [DE]: () =>
    import(
      /* webpackChunkName: "locales/de" */
      '../languages/compiled/de.json'
    ),

  [EL]: () =>
    import(
      /* webpackChunkName: "locales/el" */
      '../languages/compiled/el.json'
    ),

  [EN]: () =>
    import(
      /* webpackChunkName: "locales/en" */
      '../languages/compiled/en.json'
    ),

  [ES]: () =>
    import(
      /* webpackChunkName: "locales/es" */
      '../languages/compiled/es.json'
    ),

  [FI]: () =>
    import(
      /* webpackChunkName: "locales/fi" */
      '../languages/compiled/fi.json'
    ),

  [FR]: () =>
    import(
      /* webpackChunkName: "locales/fr" */
      '../languages/compiled/fr.json'
    ),

  [HE]: () =>
    import(
      /* webpackChunkName: "locales/he" */
      '../languages/compiled/he.json'
    ),

  [HU]: () =>
    import(
      /* webpackChunkName: "locales/hu" */
      '../languages/compiled/hu.json'
    ),

  [HY]: () =>
    import(
      /* webpackChunkName: "locales/hy" */
      '../languages/compiled/hy.json'
    ),

  [IT]: () =>
    import(
      /* webpackChunkName: "locales/it" */
      '../languages/compiled/it.json'
    ),

  [NB]: () =>
    import(
      /* webpackChunkName: "locales/nb" */
      '../languages/compiled/nb.json'
    ),

  [NL]: () =>
    import(
      /* webpackChunkName: "locales/nl" */
      '../languages/compiled/nl.json'
    ),

  [PL]: () =>
    import(
      /* webpackChunkName: "locales/pl" */
      '../languages/compiled/pl.json'
    ),

  [PT_BR]: () =>
    import(
      /* webpackChunkName: "locales/pt-br" */
      '../languages/compiled/pt-BR.json'
    ),

  [PT]: () =>
    import(
      /* webpackChunkName: "locales/pt" */
      '../languages/compiled/pt.json'
    ),

  [RU]: () =>
    import(
      /* webpackChunkName: "locales/ru" */
      '../languages/compiled/ru.json'
    ),

  [SK]: () =>
    import(
      /* webpackChunkName: "locales/sk" */
      '../languages/compiled/sk.json'
    ),

  [TR]: () =>
    import(
      /* webpackChunkName: "locales/tr" */
      '../languages/compiled/tr.json'
    ),

  [UK]: () =>
    import(
      /* webpackChunkName: "locales/uk" */
      '../languages/compiled/uk.json'
    ),
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
