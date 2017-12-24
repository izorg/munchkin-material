/* global __VERSION__ */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState from 'redux-localstorage';
import { setVersion } from 'munchkin-core/es/actions';
import * as coreReducers from 'munchkin-core/es/reducers';
import version from 'munchkin-core/es/utils/version';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import formReducer from 'redux-form/es/reducer';
import thunk from 'redux-thunk';

import reducers from '../reducers';

export default (history) => {
  const rootReducer = connectRouter(history)(combineReducers({
    ...coreReducers,
    ...reducers,
    form: formReducer,
  }));

  const enhancer = composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
    persistState([
      'app',
      'combat',
      'monsters',
      'playerColors',
      'playerList',
      'players',
    ]),
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
