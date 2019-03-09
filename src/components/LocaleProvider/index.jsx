import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLocale, getMessages, loadLocale } from '../../i18n';

const mapStateToProps = (state) => ({
  locale: state.app.locale,
});

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

  if (!messages) {
    return null;
  }

  return (
    <>
      <Helmet>
        <html lang={locale} />
      </Helmet>
      <IntlProvider
        {...rest}
        key={locale}
        locale={locale}
        messages={messages}
        textComponent={textComponent}
      />
    </>
  );
};

LocaleProvider.propTypes = {
  locale: PropTypes.string,
};

LocaleProvider.defaultProps = {
  locale: getLocale(),
};

export default connect(mapStateToProps)(LocaleProvider);
