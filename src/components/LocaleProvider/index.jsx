import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

import { getDirection, getLocale, loadMessages } from '../../i18n';

const displayName = 'LocaleProvider';

const defaultLocale = getLocale();

const LocaleProvider = ({ children }) => {
  const locale = useSelector((state) => state.settings.locale) || defaultLocale;

  const [state, setState] = useState({
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
          setState({
            error,
            loading: false,
            locale,
            messages: undefined,
          });
        }

        return;
      }

      if (active) {
        setState({
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
    document.querySelector('html').lang = state.locale;
    document.querySelector('body').dir = getDirection(state.locale);
  }, [state]);

  if (state.error) {
    throw state.error;
  }

  if (state.loading) {
    return null;
  }

  return (
    <IntlProvider locale={state.locale} messages={state.messages}>
      {children}
    </IntlProvider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

LocaleProvider.displayName = displayName;

export default LocaleProvider;
