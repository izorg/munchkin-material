import './polyfills';

import 'firebase/analytics';
import firebase from 'firebase/app';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import LocaleProvider from './components/LocaleProvider';
import ReduxProvider from './components/ReduxProvider';
import SentryHelper from './components/SentryHelper';
import WorkboxProvider from './components/WorkboxProvider';
import sentry from './sentry';

if (process.env.NODE_ENV === 'production') {
  sentry('web', 'https://41e93153dfb94d9db3ed8a2cbc7228a9@sentry.io/253536');

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

render(
  <BrowserRouter>
    <ReduxProvider>
      <SentryHelper>
        <WorkboxProvider>
          <LocaleProvider>
            <AugmentedStylesProvider>
              <AugmentedThemeProvider>
                <App />
              </AugmentedThemeProvider>
            </AugmentedStylesProvider>
          </LocaleProvider>
        </WorkboxProvider>
      </SentryHelper>
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
