import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/es/createHashHistory';

import { setFullVersion } from './actions';
import { noop } from './constants';
import App from './components/App';
import configureStore from './store/createStore';

const history = createHistory();

const store = configureStore(history);
const { dispatch } = store;

const renderAppContainer = (Component, appEl, options) => render(
  <AppContainer warnings={false}>
    <Component {...options} history={history} store={store} />
  </AppContainer>,
  appEl,
);

const defaultOptions = {
  buyFullVersion: noop,
};

const init = (appEl, options = defaultOptions) => {
  renderAppContainer(App, appEl, options);

  if (module.hot) {
    module.hot.accept('./components/App', () => renderAppContainer(App, appEl, options));
  }

  return {
    history,
    setFullVersion: fullVersion => dispatch(setFullVersion(fullVersion)),
    store,
  };
};

export {
  init, // eslint-disable-line import/prefer-default-export
};
