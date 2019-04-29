import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/symbol';

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
  rateLink: null,
  restorePurchases: null,
  shareLink: null,
  storageKey: 'redux',
};

const init = (appEl, initOptions) => {
  const { buyFullVersion, freeCombat, history, storageKey, ...options } = {
    ...defaultOptions,
    ...initOptions,
  };

  const store = configureStore({
    buyFullVersion,
    freeCombat,
    history,
    storageKey,
  });

  const { dispatch } = store;

  render(<App {...options} history={history} store={store} />, appEl);

  return {
    setFullVersion: (fullVersion) => dispatch(setFullVersion(fullVersion)),
    store,
  };
};

export default init;
