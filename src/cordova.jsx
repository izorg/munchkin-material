import './polyfills';

import * as Sentry from '@sentry/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './components/App';
import AppContainer from './components/AppContainer';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import FullVersionProvider from './components/FullVersionProvider';
import LocaleProvider from './components/LocaleProvider';
import WakeLockProvider from './components/WakeLockProvider';
import sentry from './sentry';
import configureStore from './store/configureStore';

const onDeviceReady = async () => {
  const { BuildInfo, cordova } = window;

  if (process.env.NODE_ENV === 'production' && !BuildInfo.debug) {
    sentry(
      'cordova',
      'https://14fc03bd8f6249ddbd3917a950656dcc@sentry.io/1423183',
    );
  }

  const store = configureStore();

  const history = createMemoryHistory();

  let from = `${history.location.pathname}${history.location.search}`;

  history.listen((location) => {
    const to = `${location.pathname}${location.search}`;

    Sentry.addBreadcrumb({
      category: 'navigation',
      data: {
        from,
        to,
      },
    });

    from = to;
  });

  render(
    <Provider store={store}>
      <AppContainer store={store}>
        <Router history={history}>
          <LocaleProvider>
            <WakeLockProvider>
              <FullVersionProvider>
                <AugmentedStylesProvider>
                  <AugmentedThemeProvider>
                    <App />
                  </AugmentedThemeProvider>
                </AugmentedStylesProvider>
              </FullVersionProvider>
            </WakeLockProvider>
          </LocaleProvider>
        </Router>
      </AppContainer>
    </Provider>,
    document.getElementById('root'),
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
