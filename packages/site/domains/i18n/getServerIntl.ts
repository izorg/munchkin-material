import {
  createIntl,
  createIntlCache,
  type IntlCache,
  type IntlShape,
} from "@formatjs/intl";

import { getL10nMessages, LOCALE } from "../l10n";

import { LANGUAGE } from "./constants";

const localeByLanguage: Record<LANGUAGE, LOCALE> = {
  [LANGUAGE.DE]: LOCALE.DE,
  [LANGUAGE.EN]: LOCALE.EN,
  [LANGUAGE.RU]: LOCALE.RU,
};

let cache: IntlCache | undefined;

const getCache = (): IntlCache => {
  if (!cache) {
    cache = createIntlCache();
  }

  return cache;
};

const intlCache = new Map<string, Promise<IntlShape>>();

export const getServerIntl = async (language: LANGUAGE): Promise<IntlShape> => {
  const locale = localeByLanguage[language];
  const cachedIntl = intlCache.get(locale);

  if (cachedIntl) {
    return cachedIntl;
  }

  const promise = getL10nMessages(locale).then((messages) =>
    createIntl({ locale, messages }, getCache()),
  );

  intlCache.set(locale, promise);

  return promise;
};
