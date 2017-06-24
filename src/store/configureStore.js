import { createStore } from 'munchkin';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import reducers from '../reducers';

export default function (history) {
  return createStore(
    {
      ...reducers,
      form: formReducer,
      router: routerReducer,
    },
    [routerMiddleware(history)],
  );
}
