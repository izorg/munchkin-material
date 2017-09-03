import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createHashHistory';

import 'normalize.css';

import { hideBanner, setFullVersion } from './actions';
import Root from './components/Root';
import configureStore from './store/configureStore';

import './index.css';

injectTapEventPlugin();

const history = createHistory();

const store = configureStore(history);
const { dispatch } = store;

dispatch(hideBanner());

const renderAppContainer = (Component, appEl) => render(
  <AppContainer>
    <Component history={history} store={store} />
  </AppContainer>,
  appEl,
);

const init = (appEl) => {
  renderAppContainer(Root, appEl);

  if (module.hot) {
    module.hot.accept('./components/Root', () => renderAppContainer(Root, appEl));
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
