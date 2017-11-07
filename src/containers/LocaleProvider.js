import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import { getLocale, getMessages } from '../i18n';

const mapStateToProps = (state) => {
  const locale = state.app.locale || getLocale();
  const messages = getMessages(locale);

  return {
    locale,
    messages,
  };
};

const LocaleProvider = connect(mapStateToProps)(IntlProvider);

LocaleProvider.defaultProps = {
  textComponent: ({ children }) => children,
};

export default LocaleProvider;
