import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import './polyfills';
import configureStore from './store/configureStore';

const init = (appEl, { history, Sentry }) => {
  if (Sentry) {
    Sentry.configureScope((scope) => {
      scope.setExtras({
        version: VERSION,
      });
    });
  }

  const store = configureStore({
    history,
    Sentry,
  });

  render(<App history={history} Sentry={Sentry} store={store} />, appEl);

  return {
    store,
  };
};

export default init;
