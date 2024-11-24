import { captureException } from "@sentry/react";

const localeMap = new Map<string, Intl.Locale>();

export const getLocaleDirection = (locale: string) => {
  let intlLocale = localeMap.get(locale);

  if (!intlLocale) {
    intlLocale = new Intl.Locale(locale);

    localeMap.set(locale, intlLocale);
  }

  const direction =
    intlLocale.getTextInfo?.().direction ?? intlLocale.textInfo?.direction;

  if (!direction) {
    captureException(new Error("`Intl.Locale` does not have direction info"));

    return "ltr";
  }

  return direction;
};
