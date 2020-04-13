import './polyfills';

import * as Sentry from '@sentry/browser';
import { ConnectedRouter } from 'connected-react-router';
import 'firebase/analytics';
import firebase from 'firebase/app';
import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Workbox } from 'workbox-window';

import AppContainer from './components/AppContainer';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import LocaleProvider from './components/LocaleProvider';
import Root from './components/Root';
import { showUpdate } from './ducks/update';
import configureStore from './store/configureStore';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://41e93153dfb94d9db3ed8a2cbc7228a9@sentry.io/253536',
    environment: process.env.NODE_ENV,
    release: VERSION,
  });

  const firebaseConfig = {
    apiKey: 'AIzaSyAwIA0iUuTMsyEOumkpDODkhXtpaMwDq_U',
    authDomain: 'izorg-munchkin.firebaseapp.com',
    databaseURL: 'https://izorg-munchkin.firebaseio.com',
    projectId: 'izorg-munchkin',
    storageBucket: 'izorg-munchkin.appspot.com',
    messagingSenderId: '996090838746',
    appId: '1:996090838746:web:502ca5d05189215f',
    measurementId: 'G-PXJHCTHZLJ',
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const history = createBrowserHistory();

const store = configureStore({
  history,
  Sentry,
});

render(
  <AppContainer Sentry={Sentry}>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <LocaleProvider>
          <AugmentedStylesProvider>
            <AugmentedThemeProvider>
              <Root />
            </AugmentedThemeProvider>
          </AugmentedStylesProvider>
        </LocaleProvider>
      </ConnectedRouter>
    </ReduxProvider>
  </AppContainer>,
  document.getElementById('app'),
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  const workbox = new Workbox('/service-worker.js');

  workbox.addEventListener('waiting', () => {
    store.dispatch(showUpdate());

    const prevUpdate = store.getState().update;

    store.subscribe(() => {
      if (store.getState().update === false && prevUpdate === true) {
        workbox.addEventListener('controlling', () => {
          window.location.reload();
        });

        workbox.messageSW({ type: 'SKIP_WAITING' });
      }
    });
  });

  workbox.register();
}
