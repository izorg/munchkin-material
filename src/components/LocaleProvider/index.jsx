import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

import { getDirection, getLocale, getMessages, loadLocale } from '../../i18n';

const displayName = 'LocaleProvider';

const defaultLocale = getLocale();

const LocaleProvider = (props) => {
  const localeProp = useSelector((state) => state.app.locale) || defaultLocale;

  const [{ locale, messages }, setState] = useState({
    locale: localeProp,
    messages: getMessages(localeProp),
  });

  useEffect(() => {
    (async () => {
      const loadedMessages = await loadLocale(localeProp);

      setState({
        locale: localeProp,
        messages: loadedMessages,
      });
    })();
  }, [localeProp]);

  useEffect(() => {
    document.querySelector('html').lang = locale;
    document.querySelector('body').dir = getDirection(locale);
  }, [locale]);

  if (!messages) {
    return null;
  }

  return <IntlProvider {...props} locale={locale} messages={messages} />;
};

LocaleProvider.displayName = displayName;

export default LocaleProvider;
