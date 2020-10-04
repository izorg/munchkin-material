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
import SystemPaletteTypeProvider from './components/SystemPaletteTypeProvider';
import WakeLockProvider from './components/WakeLockProvider';

render(
  <MemoryRouter>
    <CordovaProvider>
      <ReduxProvider>
        <FullVersionProvider>
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
        </FullVersionProvider>
      </ReduxProvider>
    </CordovaProvider>
  </MemoryRouter>,
  document.getElementById('root'),
);
