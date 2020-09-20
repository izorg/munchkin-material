import * as Sentry from '@sentry/react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import undoable, { includeAction } from 'redux-undo';

import { KILL_PLAYER, RESET_PLAYERS } from '../ducks/players/actionTypes';

import { loadState, saveState } from './localStorage';
import logger from './middlewares/logger';
import reducers from './reducers';

const configureStore = () => {
  const composeEnhancers = composeWithDevTools({ trace: true });

  const createRootReducer = () =>
    undoable(combineReducers(reducers), {
      filter: includeAction([KILL_PLAYER, RESET_PLAYERS]),
      limit: 1,
      syncFilter: true,
    });

  const preloadedState = loadState();

  const sentryReduxEnhancer = Sentry.createReduxEnhancer();

  const enhancer = composeEnhancers(
    applyMiddleware(thunk, logger),
    sentryReduxEnhancer,
  );

  const store = createStore(createRootReducer(), preloadedState, enhancer);

  let saveDate = new Date();
  let saveTimeout = 0;
  const timeout = 100;

  const saveStoreState = () => {
    const state = store.getState().present;

    saveState(state);

    saveDate = new Date();
  };

  store.subscribe(() => {
    if (new Date() - saveDate > timeout) {
      saveStoreState();
    } else if (!saveTimeout) {
      saveTimeout = setTimeout(() => {
        saveStoreState();

        saveTimeout = 0;
      }, timeout);
    }
  });

  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(createRootReducer()),
    );
  }

  return store;
};

export default configureStore;
