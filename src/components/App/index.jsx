import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import LocaleProvider from '../LocaleProvider';
import { OptionsProvider } from '../OptionsContext';
import Root from '../Root';
import ThemeProvider from '../ThemeProvider';

const App = ({ history, keepAwakeSupport, rateLink, shareLink, store }) => (
  <OptionsProvider value={{ keepAwakeSupport, rateLink, shareLink }}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LocaleProvider>
          <ThemeProvider>
            <Root />
          </ThemeProvider>
        </LocaleProvider>
      </ConnectedRouter>
    </Provider>
  </OptionsProvider>
);

App.propTypes = {
  history: PropTypes.object.isRequired,
  keepAwakeSupport: PropTypes.bool.isRequired,
  rateLink: PropTypes.string,
  shareLink: PropTypes.string,
  store: PropTypes.object.isRequired,
};

App.defaultProps = {
  rateLink: null,
  shareLink: null,
};

export default hot(App);
