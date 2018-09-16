import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createHashHistory';
import WebFont from 'webfontloader';

import App from './components/App';
import { setFullVersion } from './ducks/app';
import configureStore from './store/configureStore';

const history = createHistory();

const defaultOptions = {
  buyFullVersion: () => Promise.resolve(),
  keepAwakeSupport: false,
  loadFonts: true,
  rateLink: null,
  shareLink: null,
  storageKey: 'redux',
};

const init = (appEl, initOptions) => {
  const { loadFonts, storageKey, ...options } = {
    ...defaultOptions,
    ...initOptions,
  };

  if (loadFonts) {
    WebFont.load({
      classes: false,
      custom: {
        families: ['Munchkin'],
      },
      google: {
        families: ['Roboto:300,400,500,700'],
      },
    });
  }

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
