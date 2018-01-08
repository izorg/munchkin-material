import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/es/createHashHistory';

import { setFullVersion } from './actions';
import noop from './utils/noop';
import App from './components/App';
import configureStore from './store/configureStore';

const history = createHistory();

const store = configureStore(history);
const { dispatch } = store;

const renderAppContainer = (Component, appEl, options) => render(
  <Component {...options} history={history} store={store} />,
  appEl,
);

const defaultOptions = {
  buyFullVersion: noop,
};

const init = (appEl, options = defaultOptions) => {
  renderAppContainer(App, appEl, options);

  return {
    history,
    setFullVersion: fullVersion => dispatch(setFullVersion(fullVersion)),
    store,
  };
};

export {
  init, // eslint-disable-line import/prefer-default-export
};
