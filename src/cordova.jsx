import './polyfills';

import { createMemoryHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './components/App';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import CordovaHelper from './components/CordovaHelper';
import FullVersionProvider from './components/FullVersionProvider';
import LocaleProvider from './components/LocaleProvider';
import SentryHelper from './components/SentryHelper';
import WakeLockProvider from './components/WakeLockProvider';
import configureStore from './store/configureStore';

const store = configureStore();

const history = createMemoryHistory();

render(
  <Provider store={store}>
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
  </Provider>,
  document.getElementById('root'),
);
