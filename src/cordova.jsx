import './polyfills';

import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import AppContainer from './components/AppContainer';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import FullVersionProvider from './components/FullVersionProvider';
import LocaleProvider from './components/LocaleProvider';
import Root from './components/Root';
import WakeLockProvider from './components/WakeLockProvider';
import configureStore from './store/configureStore';

const onDeviceReady = () => {
  const { cordova } = window;

  const Sentry = cordova.require('sentry-cordova.Sentry');

  Sentry.init({
    dsn: 'https://14fc03bd8f6249ddbd3917a950656dcc@sentry.io/1423183',
    environment: process.env.NODE_ENV,
  });

  Sentry.configureScope((scope) => {
    scope.setExtras({
      version: VERSION,
    });
  });

  const history = createMemoryHistory();

  const store = configureStore({
    history,
    Sentry,
  });

  render(
    <AppContainer Sentry={Sentry}>
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
    </AppContainer>,
    document.getElementById('app'),
  );

  const onBackButton = (event) => {
    event.preventDefault();

    if (history.canGo(-1)) {
      history.goBack();
    } else {
      navigator.app.exitApp();
    }
  };

  document.addEventListener('backbutton', onBackButton, false);

  navigator.splashscreen.hide();
};

document.addEventListener('deviceready', onDeviceReady, false);
