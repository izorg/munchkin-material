/* global __VERSION__ */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState from 'redux-localstorage';
import { setVersion } from 'munchkin-core/es/actions';
import * as coreReducers from 'munchkin-core/es/reducers';
import deserialize from 'munchkin-core/es/store/deserialize';
import version from 'munchkin-core/es/version';
import routerMiddleware from 'react-router-redux/es/middleware';
import { routerReducer } from 'react-router-redux/es/reducer';
import formReducer from 'redux-form/es/reducer';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const rootReducer = combineReducers({
  ...coreReducers,
  ...reducers,
  form: formReducer,
  router: routerReducer,
});

export default (history) => {
  const enhancer = composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
    persistState(undefined, {
      deserialize,
    }),
  );

  const store = createStore(
    rootReducer,
    enhancer,
  );

  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
  }

  store.dispatch(setVersion('core', version));
  store.dispatch(setVersion('app', __VERSION__));

  return store;
};
