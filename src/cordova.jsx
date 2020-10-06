import './polyfills';

import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import App from './components/App';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import CordovaProvider from './components/CordovaProvider';
import FullVersionProvider from './components/FullVersionProvider';
import LocaleProvider from './components/LocaleProvider';
import ReduxProvider from './components/ReduxProvider';
import SystemPaletteModeProvider from './components/SystemPaletteModeProvider';
import WakeLockProvider from './components/WakeLockProvider';

render(
  <MemoryRouter>
    <CordovaProvider>
      <ReduxProvider>
        <FullVersionProvider>
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
        </FullVersionProvider>
      </ReduxProvider>
    </CordovaProvider>
  </MemoryRouter>,
  document.getElementById('root'),
);
