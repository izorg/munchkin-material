import { match } from "@formatjs/intl-localematcher";
import { captureException, captureMessage } from "@sentry/react";

import {
  polyfillIntlGetCanonicalLocales,
  polyfillIntlLocale,
} from "./polyfillIntl";
import { EN, isSupportedLocale, supportedLocales } from "./supportedLocales";

export const getBrowserLocale = async () => {
  await polyfillIntlGetCanonicalLocales();
  await polyfillIntlLocale();

  let locale;

  try {
    locale = match(navigator.languages, supportedLocales, EN, {
      /**
       * Used for better matching locales without country like `en`, `ru`, etc.
       * See https://datatracker.ietf.org/doc/html/rfc4647#section-3.4
       */
      algorithm: "lookup",
    });
  } catch (error) {
    captureException(error, {
      extra: {
        language: navigator.language,
        languages: navigator.languages,
      },
    });

    return EN;
  }

  if (isSupportedLocale(locale)) {
    return locale;
  } else {
    captureMessage(`Unsupported locale: ${locale}`);
  }

  return EN;
};
