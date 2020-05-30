import './polyfills';

import * as Sentry from '@sentry/browser';
import 'firebase/analytics';
import firebase from 'firebase/app';
import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';

import AppContainer from './components/AppContainer';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import LocaleProvider from './components/LocaleProvider';
import Root from './components/Root';
import WorkboxProvider from './components/WorkboxProvider';
import configureStore from './store/configureStore';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://41e93153dfb94d9db3ed8a2cbc7228a9@sentry.io/253536',
    environment: process.env.NODE_ENV,
    release: VERSION,
  });

  firebase.initializeApp({
    apiKey: 'AIzaSyAwIA0iUuTMsyEOumkpDODkhXtpaMwDq_U',
    appId: '1:996090838746:web:502ca5d05189215f',
    authDomain: 'izorg-munchkin.firebaseapp.com',
    databaseURL: 'https://izorg-munchkin.firebaseio.com',
    measurementId: 'G-PXJHCTHZLJ',
    messagingSenderId: '996090838746',
    projectId: 'izorg-munchkin',
    storageBucket: 'izorg-munchkin.appspot.com',
  });
  firebase.analytics();
}

const history = createBrowserHistory();
const store = configureStore();

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

render(
  <AppContainer Sentry={Sentry}>
    <ReduxProvider store={store}>
      <Router history={history}>
        <WorkboxProvider>
          <LocaleProvider>
            <AugmentedStylesProvider>
              <AugmentedThemeProvider>
                <Root />
              </AugmentedThemeProvider>
            </AugmentedStylesProvider>
          </LocaleProvider>
        </WorkboxProvider>
      </Router>
    </ReduxProvider>
  </AppContainer>,
  document.getElementById('app'),
);
