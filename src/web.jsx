import './polyfills';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import LocaleProvider from './components/LocaleProvider';
import ReduxProvider from './components/ReduxProvider';
import SystemPaletteTypeProvider from './components/SystemPaletteTypeProvider';
import WakeLockProvider from './components/WakeLockProvider';
import WorkboxProvider from './components/WorkboxProvider';
import sentry from './sentry';

if (process.env.NODE_ENV === 'production') {
  sentry('https://41e93153dfb94d9db3ed8a2cbc7228a9@sentry.io/253536');
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
            <SystemPaletteTypeProvider>
              <AugmentedStylesProvider>
                <AugmentedThemeProvider>
                  <App />
                </AugmentedThemeProvider>
              </AugmentedStylesProvider>
            </SystemPaletteTypeProvider>
          </LocaleProvider>
        </WakeLockProvider>
      </WorkboxProvider>
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
