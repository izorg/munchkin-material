import PropTypes from "prop-types";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { type IntlConfig, IntlProvider } from "react-intl";

import { getDirection, getLocale, loadMessages } from "../../i18n";
import usePresentSelector from "../../utils/usePresentSelector";

const defaultLocale = getLocale();

type LocalState = {
  locale: string;
} & (
  | {
      loading: true;
    }
  | {
      error: Error;
      loading: false;
    }
  | {
      loading: false;
      messages: IntlConfig["messages"];
    }
);

const LocaleProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const locale =
    usePresentSelector((state) => state.settings.locale) || defaultLocale;

  const [localeState, setLocaleState] = useState<LocalState>({
    loading: true,
    locale,
  });

  useEffect(() => {
    let active = true;

    void (async () => {
      let messages;

      try {
        messages = await loadMessages(locale);
      } catch (error) {
        if (active && error instanceof Error) {
          setLocaleState({
            error,
            loading: false,
            locale,
          });
        }

        return;
      }

      if (active) {
        setLocaleState({
          loading: false,
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

  if (localeState.loading) {
    return null;
  }

  return (
    <IntlProvider locale={localeState.locale} messages={localeState.messages}>
      {children}
    </IntlProvider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleProvider;
