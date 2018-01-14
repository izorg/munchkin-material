/* global __VERSION__ */
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setVersion } from 'munchkin-core/es/actions';
import version from 'munchkin-core/es/utils/version';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import formReducer from 'redux-form/es/reducer';
import thunk from 'redux-thunk';
import pick from 'lodash/pick';
import throttle from 'lodash/throttle';

import reducers from '../reducers';

import { loadState, saveState } from './localStorage';

const getRootReducer = history => compose(
  connectRouter(history),
  combineReducers,
)({
  ...reducers,
  form: formReducer,
});

export default (history) => {
  const enhancer = composeWithDevTools(applyMiddleware(
    thunk,
    routerMiddleware(history),
  ));

  const preloadedState = loadState();

  const store = createStore(
    getRootReducer(history),
    preloadedState,
    enhancer,
  );

  store.subscribe(throttle(() => {
    const state = pick(store.getState(), Object.keys(reducers));

    saveState(state);
  }, 100));

  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(getRootReducer(history)));
  }

  store.dispatch(setVersion('core', version));
  store.dispatch(setVersion('app', __VERSION__));

  return store;
};
