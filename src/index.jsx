import 'core-js';

import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createHashHistory';

import App from './components/App';
import { setFullVersion } from './ducks/app';
import configureStore from './store/configureStore';

const history = createHistory();

const defaultOptions = {
  buyFullVersion: () => Promise.resolve(),
  freeCombat: false,
  keepAwakeSupport: false,
  rateLink: null,
  restorePurchases: null,
  shareLink: null,
  storageKey: 'redux',
};

const init = (appEl, initOptions) => {
  const { buyFullVersion, freeCombat, storageKey, ...options } = {
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
    history,
    setFullVersion: (fullVersion) => dispatch(setFullVersion(fullVersion)),
    store,
  };
};

export default init;
