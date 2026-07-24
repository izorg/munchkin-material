import { createIntl, createIntlCache, type IntlShape } from "@formatjs/intl";

import { getL10nMessages, LOCALE } from "../l10n";

import { LANGUAGE } from "./constants";

const localeByLanguage: Record<LANGUAGE, LOCALE> = {
  [LANGUAGE.DE]: LOCALE.DE,
  [LANGUAGE.EN]: LOCALE.EN,
  [LANGUAGE.RU]: LOCALE.RU,
};

const cache = createIntlCache();

const intlCache = new Map<LOCALE, Promise<IntlShape>>();

export const getServerIntl = async (language: LANGUAGE): Promise<IntlShape> => {
  const locale = localeByLanguage[language];
  const cachedIntl = intlCache.get(locale);

  if (cachedIntl !== undefined) {
    return cachedIntl;
  }

  // eslint-disable-next-line unicorn/prefer-await -- unresolved promise needed
  const promise = getL10nMessages(locale).then((messages) =>
    createIntl({ locale, messages }, cache),
  );

  intlCache.set(locale, promise);

  return promise;
};
