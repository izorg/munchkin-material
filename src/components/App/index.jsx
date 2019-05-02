import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import PropTypes from 'prop-types';

import LocaleProvider from '../LocaleProvider';
import OptionsContext from '../OptionsContext';
import ReduxProvider from '../ReduxProvider';
import Root from '../Root';
import ThemeProvider from '../ThemeProvider';

class App extends Component {
  componentDidCatch(error, errorInfo) {
    const { Sentry } = this.props;

    if (Sentry) {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
    }
  }

  render() {
    const {
      history,
      keepAwakeSupport,
      privacyLink,
      rateLink,
      restorePurchases,
      shareLink,
      store,
    } = this.props;

    return (
      <OptionsContext.Provider
        value={{
          keepAwakeSupport,
          privacyLink,
          rateLink,
          restorePurchases,
          shareLink,
        }}
      >
        <ReduxProvider history={history} store={store}>
          <LocaleProvider>
            <ThemeProvider>
              <Root />
            </ThemeProvider>
          </LocaleProvider>
        </ReduxProvider>
      </OptionsContext.Provider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  keepAwakeSupport: PropTypes.bool.isRequired,
  privacyLink: PropTypes.string,
  rateLink: PropTypes.string,
  restorePurchases: PropTypes.func,
  shareLink: PropTypes.string,
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  privacyLink: null,
  rateLink: null,
  restorePurchases: null,
  shareLink: null,
};

export default hot(App);
