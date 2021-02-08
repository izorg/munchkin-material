import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";

import { getDirection, getLocale, loadMessages } from "../../i18n";

const displayName = "LocaleProvider";

const defaultLocale = getLocale();

const LocaleProvider = ({ children }) => {
  const locale =
    useSelector((state) => state.present.settings.locale) || defaultLocale;

  const [localeState, setLocaleState] = useState({
    error: undefined,
    loading: true,
    locale,
    messages: undefined,
  });

  useEffect(() => {
    let active = true;

    (async () => {
      let messages;

      try {
        messages = await loadMessages(locale);
      } catch (error) {
        if (active) {
          setLocaleState({
            error,
            loading: false,
            locale,
            messages: undefined,
          });
        }

        return;
      }

      if (active) {
        setLocaleState({
          error: undefined,
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
    document.querySelector("html").lang = localeState.locale;
    document.querySelector("body").dir = getDirection(localeState.locale);
  }, [localeState]);

  if (localeState.error) {
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
  children: PropTypes.node.isRequired,
};

LocaleProvider.displayName = displayName;

export default LocaleProvider;
