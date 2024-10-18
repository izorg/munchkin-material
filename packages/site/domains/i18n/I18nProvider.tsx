"use client";

import { captureException } from "@sentry/nextjs";
import { type PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";

import { type LocaleMessages } from "../l10n";

type I18nProviderProps = PropsWithChildren<{
  locale: string;
  messages: LocaleMessages;
}>;

export const I18nProvider = ({
  children,
  locale,
  messages,
}: I18nProviderProps) => (
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
