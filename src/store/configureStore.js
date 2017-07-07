/* global __VERSION__ */
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { actions, createStore } from 'munchkin';

import reducers from '../reducers';

export default function (history) {
  const store = createStore(
    {
      ...reducers,
      form: formReducer,
      router: routerReducer,
    },
    [routerMiddleware(history)],
  );

  store.dispatch(actions.setVersion('app', __VERSION__));

  return store;
}
