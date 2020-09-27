import './polyfills';

import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import App from './components/App';
import CordovaProvider from './components/CordovaProvider';
import FullVersionProvider from './components/FullVersionProvider';
import ReduxProvider from './components/ReduxProvider';
import SentryHelper from './components/SentryHelper';

render(
  <MemoryRouter>
    <ReduxProvider>
      <CordovaProvider>
        <SentryHelper>
          <FullVersionProvider>
            <App />
          </FullVersionProvider>
        </SentryHelper>
      </CordovaProvider>
    </ReduxProvider>
  </MemoryRouter>,
  document.getElementById('root'),
);
