import { connectRouter, routerMiddleware } from 'connected-react-router';
import { pick, throttle } from 'lodash/fp';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from '../reducers';

import { loadState, saveState } from './localStorage';
import errorReporter from './middlewares/errorReporter';
import purchase from './middlewares/purchase';

const configureStore = ({ buyFullVersion, freeCombat, history, Sentry }) => {
  const composeEnhancers = composeWithDevTools({ trace: true });

  const router = connectRouter(history);

  const createRootReducer = () =>
    combineReducers({
      router,
      ...reducers,
    });

  const preloadedState = loadState();

  const enhancer = composeEnhancers(
    applyMiddleware(
      errorReporter(Sentry),
      routerMiddleware(history),
      thunk,
      purchase({ buyFullVersion, freeCombat }),
    ),
  );

  const store = createStore(createRootReducer(), preloadedState, enhancer);

  store.subscribe(
    throttle(100, () => {
      const state = pick(Object.keys(reducers), store.getState());

      saveState(state);
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
