import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createHashHistory';

import { setFullVersion } from './actions';
import { noop } from './constants';
import Root from './components/Root';
import configureStore from './store/configureStore';

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
  renderAppContainer(Root, appEl, options);

  if (module.hot) {
    module.hot.accept('./components/Root', () => renderAppContainer(Root, appEl, options));
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
