import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLocale, getMessages, loadLocale } from '../../i18n';

const textComponent = ({ children }) => children;

const LocaleProvider = ({ locale: localeProp, ...rest }) => {
  const [{ locale, messages }, setState] = useState({
    locale: localeProp,
    messages: getMessages(localeProp),
  });

  useEffect(() => {
    (async () => {
      const result = await loadLocale(localeProp);

      setState({
        locale: localeProp,
        messages: result.messages,
      });
    })();
  }, [localeProp]);

  useEffect(() => {
    document.querySelector('html').lang = locale;
  }, [locale]);

  if (!messages) {
    return null;
  }

  return (
    <IntlProvider
      {...rest}
      key={locale}
      locale={locale}
      messages={messages}
      textComponent={textComponent}
    />
  );
};

LocaleProvider.propTypes = {
  locale: PropTypes.string,
};

LocaleProvider.defaultProps = {
  locale: getLocale(),
};

LocaleProvider.displayName = 'LocaleProvider';

const mapStateToProps = (state) => ({
  locale: state.app.locale,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleProvider);
