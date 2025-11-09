import { type MessageFormatElement } from "@formatjs/icu-messageformat-parser";

import { type LOCALE } from "./constants";

export type LocaleMessages =
  | Record<string, MessageFormatElement[]>
  | Record<string, string>;

export const getL10nMessages = async (locale: LOCALE) => {
  const { default: messages } = (await import(
    process.env.NODE_ENV === "development"
      ? `./messages/${locale}.json`
      : `./messages/generated/${locale}.json`,
    {
      with: {
        type: "json",
      },
    }
  )) as { default: LocaleMessages };

  return messages;
};
