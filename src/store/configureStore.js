import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { loadState, saveState } from './localStorage';
import errorReporter from './middlewares/errorReporter';
import logger from './middlewares/logger';
import reducers from './reducers';

const configureStore = () => {
  const composeEnhancers = composeWithDevTools({ trace: true });

  const createRootReducer = () => combineReducers(reducers);

  const preloadedState = loadState();

  const enhancer = composeEnhancers(
    applyMiddleware(errorReporter, thunk, logger),
  );

  const store = createStore(createRootReducer(), preloadedState, enhancer);

  let saveDate = new Date();
  let saveTimeout = 0;
  const timeout = 100;

  const saveStoreState = () => {
    const { update, ...state } = store.getState();

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
