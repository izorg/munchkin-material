import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createHashHistory';

import 'normalize.css';

import { hideBanner } from './actions';
import Root from './containers/Root';
import configureStore from './store/configureStore';

import './index.css';

injectTapEventPlugin();

const history = createHistory();

const store = configureStore(history);

store.dispatch(hideBanner());

function renderAppContainer(Component, appEl) {
  render(
    <AppContainer>
      <Component history={history} store={store} />
    </AppContainer>,
    appEl,
  );
}

function init(appEl) {
  renderAppContainer(Root, appEl);

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      renderAppContainer(Root, appEl);
    });
  }

  return {
    history,
    store,
  };
}

export {
  init, // eslint-disable-line import/prefer-default-export
};
