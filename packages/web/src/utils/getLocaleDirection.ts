const localeMap = new Map<string, Intl.Locale>();

export const getLocaleDirection = (locale: string) => {
  let intlLocale = localeMap.get(locale);

  if (!intlLocale) {
    intlLocale = new Intl.Locale(locale);

    localeMap.set(locale, intlLocale);
  }

  return intlLocale.getTextInfo().direction;
};
