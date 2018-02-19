import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createHashHistory';

import { setFullVersion } from './actions';
import App from './components/App';
import configureStore from './store/configureStore';

// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line global-require
//   const { whyDidYouUpdate } = require('why-did-you-update');
//
//   whyDidYouUpdate(React, {
//     exclude: /(Backdrop|CSSTransition|FormattedMessage|IconButton|Paper|Portal|ProxyComponent|RefHolder|Ripple|SvgIcon|Tooltip|TouchRipple|TransitionGroup)/,
//   });
// }

const history = createHistory();

const defaultOptions = {
  buyFullVersion: () => Promise.resolve(),
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
