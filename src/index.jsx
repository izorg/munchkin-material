import 'core-js/es/array/find'; // for react-final-form
import 'core-js/es/map'; // for react
import 'core-js/es/set'; // for react
import 'core-js/es/symbol'; // for @material-ui/styles ThemeProvider

import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import { setFullVersion } from './ducks/app';
import configureStore from './store/configureStore';

const defaultOptions = {
  buyFullVersion: () => Promise.resolve(),
  freeCombat: false,
  history: null,
  keepAwakeSupport: false,
  privacyLink: null,
  rateLink: null,
  restorePurchases: null,
  Sentry: null,
  shareLink: null,
  storageKey: 'redux',
};

const init = (appEl, initOptions) => {
  const {
    buyFullVersion,
    freeCombat,
    history,
    Sentry,
    storageKey,
    ...options
  } = {
    ...defaultOptions,
    ...initOptions,
  };

  if (Sentry) {
    Sentry.configureScope((scope) => {
      scope.setExtra('version', VERSION);
    });
  }

  const store = configureStore({
    buyFullVersion,
    freeCombat,
    history,
    storageKey,
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
