/* global __VERSION__ */
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setVersion, version } from 'munchkin-core';
import thunk from 'redux-thunk';
import { pick, throttle } from 'lodash/fp';

import reducers from '../reducers';

import { loadState, saveState } from './localStorage';
import purchase from './middlewares/purchase';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

export default ({ buyFullVersion, history, storageKey }) => {
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk, purchase(buyFullVersion), routerMiddleware(history)),
  );

  const preloadedState = loadState(storageKey);

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    enhancer,
  );

  store.subscribe(
    throttle(100, () => {
      const state = pick(Object.keys(reducers), store.getState());

      saveState(storageKey, state);
    }),
  );

  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(createRootReducer(history)),
    );
  }

  store.dispatch(setVersion('core', version));
  store.dispatch(setVersion('app', __VERSION__));

  return store;
};
