import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { pick, throttle } from 'lodash/fp';

import reducers from '../reducers';

import { loadState, saveState } from './localStorage';
import purchase from './middlewares/purchase';

const configureStore = ({
  buyFullVersion,
  freeCombat,
  history,
  storageKey,
}) => {
  const composeEnhancers = composeWithDevTools({ trace: true });

  const router = connectRouter(history);

  const createRootReducer = () =>
    combineReducers({
      router,
      ...reducers,
    });

  const preloadedState = loadState(storageKey);

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
      purchase({ buyFullVersion, freeCombat }),
      routerMiddleware(history),
    ),
  );

  const store = createStore(createRootReducer(), preloadedState, enhancer);

  store.subscribe(
    throttle(100, () => {
      const state = pick(Object.keys(reducers), store.getState());

      saveState(storageKey, state);
    }),
  );

  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(createRootReducer()),
    );
  }

  return store;
};

export default configureStore;
