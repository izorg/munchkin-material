import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import AugmentedStylesProvider from '../AugmentedStylesProvider';
import AugmentedThemeProvider from '../AugmentedThemeProvider';
import ConfigProvider from '../ConfigProvider';
import FullVersionProvider from '../FullVersionProvider';
import LocaleProvider from '../LocaleProvider';
import Root from '../Root';
import WakeLockProvider from '../WakeLockProvider';

const displayName = 'App';

class App extends Component {
  componentDidCatch(error, errorInfo) {
    const { Sentry, store } = this.props;

    if (Sentry) {
      Sentry.withScope((scope) => {
        scope.setExtras({
          ...errorInfo,
          state: store.getState(),
        });
        Sentry.captureException(error);
      });
    }
  }

  render() {
    const { history, options, store } = this.props;

    return (
      <ConfigProvider value={options}>
        <ReduxProvider store={store}>
          <ConnectedRouter history={history}>
            <LocaleProvider>
              <WakeLockProvider>
                <FullVersionProvider>
                  <AugmentedStylesProvider>
                    <AugmentedThemeProvider>
                      <Root />
                    </AugmentedThemeProvider>
                  </AugmentedStylesProvider>
                </FullVersionProvider>
              </WakeLockProvider>
            </LocaleProvider>
          </ConnectedRouter>
        </ReduxProvider>
      </ConfigProvider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};

App.displayName = displayName;

export default App;
