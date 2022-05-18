import { captureException } from "@sentry/react";
import PropTypes from "prop-types";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { type IntlConfig, IntlProvider } from "react-intl";

import { getDirection, getLocale, loadMessages } from "../../i18n";
import store from "../../store";
import AsyncResource from "../../utils/AsyncResource";
import usePresentSelector from "../../utils/usePresentSelector";

import polyfillIntl from "./polyfillIntl";

const defaultLocale = getLocale();

type LocalState = {
  locale: string;
} & (
  | {
      error: Error;
    }
  | {
      messages: IntlConfig["messages"];
    }
);

const initialLocale = store.getState().present.settings.locale || defaultLocale;

const polyfillResource = new AsyncResource(polyfillIntl(initialLocale));

const messagesResource = new AsyncResource(loadMessages(initialLocale));

const LocaleProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  polyfillResource.read();

  const locale =
    usePresentSelector((state) => state.settings.locale) || defaultLocale;

  const [localeState, setLocaleState] = useState<LocalState>({
    locale,
    messages: messagesResource.read(),
  });

  useEffect(() => {
    let active = true;

    void (async () => {
      await polyfillIntl(locale);

      let messages;

      try {
        messages = await loadMessages(locale);
      } catch (error) {
        if (active && error instanceof Error) {
          setLocaleState({
            error,
            locale,
          });
        }

        return;
      }

      if (active) {
        setLocaleState({
          locale,
          messages,
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = localeState.locale;
    document.body.dir = getDirection(localeState.locale);
  }, [localeState]);

  if ("error" in localeState) {
    throw localeState.error;
  }

  return (
    <IntlProvider
      locale={localeState.locale}
      messages={localeState.messages}
      onError={
        process.env.NODE_ENV === "production" ? captureException : undefined
      }
    >
      {children}
    </IntlProvider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleProvider;
