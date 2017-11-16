/* global __VERSION__ */
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
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
