import './polyfills';

import { createMemoryHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import AppContainer from './components/AppContainer';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import FullVersionProvider from './components/FullVersionProvider';
import LocaleProvider from './components/LocaleProvider';
import Root from './components/Root';
import WakeLockProvider from './components/WakeLockProvider';
import sentry from './sentry';
import configureStore from './store/configureStore';

const onDeviceReady = async () => {
  const { cordova } = window;

  const debug = await new Promise(cordova.plugins.IsDebug.getIsDebug);

  if (process.env.NODE_ENV === 'production' && !debug) {
    sentry('https://14fc03bd8f6249ddbd3917a950656dcc@sentry.io/1423183');
  }

  const store = configureStore();

  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <AppContainer store={store}>
        <Router history={history}>
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
        </Router>
      </AppContainer>
    </Provider>,
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

  if (cordova.platformId === 'windows') {
    const { Windows } = window;

    const currentView = Windows.UI.Core.SystemNavigationManager.getForCurrentView();

    currentView.appViewBackButtonVisibility =
      Windows.UI.Core.AppViewBackButtonVisibility.collapsed;
  }
};

document.addEventListener('deviceready', onDeviceReady, false);
