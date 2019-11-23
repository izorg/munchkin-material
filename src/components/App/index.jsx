import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import { storeShape } from '../../propTypes';

import AugmentedStylesProvider from '../AugmentedStylesProvider';
import AugmentedThemeProvider from '../AugmentedThemeProvider';
import ConfigProvider from '../ConfigProvider';
import LocaleProvider from '../LocaleProvider';
import Root from '../Root';
import StoreProvider from '../StoreProvider';

class App extends Component {
  componentDidCatch(error, errorInfo) {
    const { Sentry, store } = this.props;

    if (Sentry) {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });
        scope.setExtra('state', store.getState());
        Sentry.captureException(error);
      });
    }
  }

  render() {
    const { history, options, store } = this.props;

    return (
      <ConfigProvider value={options}>
        <StoreProvider history={history} store={store}>
          <LocaleProvider>
            <AugmentedStylesProvider>
              <AugmentedThemeProvider>
                <Root />
              </AugmentedThemeProvider>
            </AugmentedStylesProvider>
          </LocaleProvider>
        </StoreProvider>
      </ConfigProvider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: storeShape.isRequired,
};

App.displayName = 'App';

export default hot(App);
