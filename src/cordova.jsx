import './polyfills';

import { createMemoryHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import App from './components/App';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import CordovaHelper from './components/CordovaHelper';
import FullVersionProvider from './components/FullVersionProvider';
import LocaleProvider from './components/LocaleProvider';
import ReduxProvider from './components/ReduxProvider';
import SentryHelper from './components/SentryHelper';
import WakeLockProvider from './components/WakeLockProvider';

const history = createMemoryHistory();

render(
  <ReduxProvider>
    <Router history={history}>
      <CordovaHelper>
        <SentryHelper forceNavigationBreadcrumbs>
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
        </SentryHelper>
      </CordovaHelper>
    </Router>
  </ReduxProvider>,
  document.getElementById('root'),
);
