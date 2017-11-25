/* global __VERSION__ */
import routerMiddleware from 'react-router-redux/es/middleware';
import { routerReducer } from 'react-router-redux/es/reducer';
import formReducer from 'redux-form/es/reducer';
import thunk from 'redux-thunk';
import { setVersion } from 'munchkin-core/es/actions';
import createStore from 'munchkin-core/es/store/createStore';

import reducers from '../reducers';

export default function (history) {
  const store = createStore(
    {
      ...reducers,
      form: formReducer,
      router: routerReducer,
    },
    [
      thunk,
      routerMiddleware(history),
    ],
  );

  store.dispatch(setVersion('app', __VERSION__));

  return store;
}
