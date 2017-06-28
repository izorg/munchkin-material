import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { getLocale, getMessages } from '../i18n';
import App from '../containers/App';
import munchkinTheme from '../styles/munchkinTheme';

const locale = getLocale();
const messages = getMessages();

const Root = ({ history, store }) => (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <MuiThemeProvider muiTheme={getMuiTheme(munchkinTheme)}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: storeShape.isRequired,
};

export default Root;
