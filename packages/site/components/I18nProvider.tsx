"use client";

import { type MessageFormatElement } from "@formatjs/icu-messageformat-parser";
import { captureException } from "@sentry/nextjs";
import { type PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";

import { type Locale } from "../lib/i18n";

type I18nProviderProps = PropsWithChildren<{
  locale: Locale;
  messages: Record<string, MessageFormatElement[]> | Record<string, string>;
}>;

export const I18nProvider = ({
  children,
  locale,
  messages,
}: I18nProviderProps) => {
  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      onError={
        process.env.NODE_ENV === "production" ? captureException : undefined
      }
    >
      {children}
    </IntlProvider>
  );
};
