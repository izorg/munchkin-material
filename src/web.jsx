import './polyfills';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import LocaleProvider from './components/LocaleProvider';
import ReduxProvider from './components/ReduxProvider';
import SystemPaletteModeProvider from './components/SystemPaletteModeProvider';
import WakeLockProvider from './components/WakeLockProvider';
import WorkboxProvider from './components/WorkboxProvider';
import sentry from './sentry';

if (process.env.NODE_ENV === 'production') {
  sentry();
}

import(/* webpackChunkName: "firebase" */ './firebase').catch(() => {
  // ignore firebase init errors
});

render(
  <BrowserRouter>
    <ReduxProvider>
      <WorkboxProvider>
        <WakeLockProvider>
          <LocaleProvider>
            <SystemPaletteModeProvider>
              <AugmentedStylesProvider>
                <AugmentedThemeProvider>
                  <App />
                </AugmentedThemeProvider>
              </AugmentedStylesProvider>
            </SystemPaletteModeProvider>
          </LocaleProvider>
        </WakeLockProvider>
      </WorkboxProvider>
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
