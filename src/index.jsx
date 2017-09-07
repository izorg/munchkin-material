import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createHashHistory';

import 'normalize.css';

import { hideBanner, setFullVersion } from './actions';
import Root from './components/Root';
import configureStore from './store/configureStore';

import './index.css';

const history = createHistory();

const store = configureStore(history);
const { dispatch } = store;

dispatch(hideBanner());

const renderAppContainer = (Component, appEl, options) => render(
  <AppContainer>
    <Component {...options} history={history} store={store} />
  </AppContainer>,
  appEl,
);

const init = (appEl, options) => {
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
