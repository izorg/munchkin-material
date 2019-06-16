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
      <OptionsContext.Provider value={options}>
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
  options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

App.displayName = 'App';

export default hot(App);
