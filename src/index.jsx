import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import { setFullVersion } from './ducks/app';
import './polyfills';
import configureStore from './store/configureStore';

const defaultOptions = {
  buyFullVersion: () => Promise.resolve(),
  history: null,
  privacyLink: null,
  rateLink: null,
  Sentry: null,
};

const init = (appEl, initOptions) => {
  const { buyFullVersion, history, Sentry, ...options } = {
    ...defaultOptions,
    ...initOptions,
  };

  if (Sentry) {
    Sentry.configureScope((scope) => {
      scope.setExtras({
        version: VERSION,
      });
    });
  }

  const store = configureStore({
    buyFullVersion,
    history,
    Sentry,
  });

  const { dispatch } = store;

  render(
    <App history={history} options={options} Sentry={Sentry} store={store} />,
    appEl,
  );

  return {
    setFullVersion: (fullVersion) => dispatch(setFullVersion(fullVersion)),
    store,
  };
};

export default init;
