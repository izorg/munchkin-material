import './polyfills';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import ReduxProvider from './components/ReduxProvider';
import SentryHelper from './components/SentryHelper';
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
      <SentryHelper>
        <WorkboxProvider>
          <App />
        </WorkboxProvider>
      </SentryHelper>
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
