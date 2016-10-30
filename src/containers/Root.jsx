import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { Router } from 'react-router';
import { history as historyShape } from 'react-router/lib/InternalPropTypes';

import { getLocale, getMessages } from '../i18n';
import routes from '../routes';

const locale = getLocale();
const messages = getMessages();

const Root = ({ history, store }) => (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <Router key={Math.random()} history={history} routes={routes} />
    </IntlProvider>
  </Provider>
);

Root.propTypes = {
  history: historyShape.isRequired,
  store: storeShape.isRequired,
};

export default Root;
