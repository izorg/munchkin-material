import './polyfills';

import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import App from './components/App';
import CordovaProvider from './components/CordovaProvider';
import FullVersionProvider from './components/FullVersionProvider';
import ReduxProvider from './components/ReduxProvider';
import SentryNavigationBreadcrumbs from './components/SentryNavigationBreadcrumbs';

render(
  <MemoryRouter>
    <SentryNavigationBreadcrumbs />
    <ReduxProvider>
      <CordovaProvider>
        <FullVersionProvider>
          <App />
        </FullVersionProvider>
      </CordovaProvider>
    </ReduxProvider>
  </MemoryRouter>,
  document.getElementById('root'),
);
