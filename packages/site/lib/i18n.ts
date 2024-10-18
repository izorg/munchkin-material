import { type MessageFormatElement } from "@formatjs/icu-messageformat-parser";
import {
  createIntl,
  createIntlCache,
  type IntlCache,
  type IntlShape,
} from "@formatjs/intl";

import { LANGUAGE_EN, LANGUAGE_RU } from "./languages";
import type * as languages from "./languages";
import { LOCALE_EN, LOCALE_RU } from "./locales";
import type * as locales from "./locales";

export type Language = (typeof languages)[keyof typeof languages];
export type Locale = (typeof locales)[keyof typeof locales];

export const localeByLanguage: Record<Language, Locale> = {
  [LANGUAGE_EN]: LOCALE_EN,
  [LANGUAGE_RU]: LOCALE_RU,
};

let cache: IntlCache | undefined;

const getCache = (): IntlCache => {
  if (!cache) {
    cache = createIntlCache();
  }

  return cache;
};

const intlCache = new Map<string, Promise<IntlShape>>();

type LocaleMessages =
  | Record<string, MessageFormatElement[]>
  | Record<string, string>;

export const getLocalMessages = (locale: Locale) =>
  import(`../domains/l10n/messages/generated/${locale}.json`).then(
    (module: { default: LocaleMessages }) => module.default,
  );

export const getServerIntl = async (locale: Locale): Promise<IntlShape> => {
  const cachedIntl = intlCache.get(locale);

  if (cachedIntl) {
    return cachedIntl;
  }

  const promise = getLocalMessages(locale).then((messages) =>
    createIntl({ locale, messages }, getCache()),
  );

  intlCache.set(locale, promise);

  return promise;
};
