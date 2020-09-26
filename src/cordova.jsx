import './polyfills';

import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import App from './components/App';
import CordovaHelper from './components/CordovaHelper';
import FullVersionProvider from './components/FullVersionProvider';
import ReduxProvider from './components/ReduxProvider';
import SentryHelper from './components/SentryHelper';

render(
  <MemoryRouter>
    <ReduxProvider>
      <CordovaHelper>
        <SentryHelper>
          <FullVersionProvider>
            <App />
          </FullVersionProvider>
        </SentryHelper>
      </CordovaHelper>
    </ReduxProvider>
  </MemoryRouter>,
  document.getElementById('root'),
);
