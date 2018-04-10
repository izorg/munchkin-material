import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createHashHistory';

import App from './components/App';
import { setFullVersion } from './ducks/app';
import configureStore from './store/configureStore';

const history = createHistory();

const defaultOptions = {
  buyFullVersion: () => Promise.resolve(),
  keepAwakeSupport: false,
  storageKey: 'redux',
};

const init = (appEl, initOptions) => {
  const { storageKey, ...options } = { ...defaultOptions, ...initOptions };

  const store = configureStore({
    buyFullVersion: options.buyFullVersion,
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
