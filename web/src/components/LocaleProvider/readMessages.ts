import { type ResolvedIntlConfig } from "react-intl";

import { loadMessages, type SupportedLocale } from "../../i18n";

import polyfillIntl from "./polyfillIntl";

type Messages = ResolvedIntlConfig["messages"];

const cache: Record<string, Messages | Promise<Messages>> = {};

const readMessages = (locale: SupportedLocale): Messages => {
  if (!cache[locale]) {
    cache[locale] = Promise.all([
      loadMessages(locale),
      polyfillIntl(locale),
    ]).then(([messages]) => (cache[locale] = messages));
  }

  const result = cache[locale];

  if ("then" in result) {
    throw result;
  }

  return result;
};

export default readMessages;
