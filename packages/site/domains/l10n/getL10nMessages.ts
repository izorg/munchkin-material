import { type MessageFormatElement } from "@formatjs/icu-messageformat-parser";

import { type LOCALE } from "./constants";

export type LocaleMessages =
  | Record<string, MessageFormatElement[]>
  | Record<string, string>;

export const getL10nMessages = (locale: LOCALE) =>
  import(`./messages/generated/${locale}.json`).then(
    (module: { default: LocaleMessages }) => module.default,
  );
