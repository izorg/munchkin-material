import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/es/createHashHistory';
import { noop } from 'lodash-es';

import { setFullVersion } from './actions';
import App from './components/App';
import configureStore from './store/configureStore';

const history = createHistory();

const store = configureStore(history);
const { dispatch } = store;

const defaultOptions = {
  buyFullVersion: noop,
};

const init = (appEl, options = defaultOptions) => {
  render(
    <App {...options} history={history} store={store} />,
    appEl,
  );

  return {
    history,
    setFullVersion: fullVersion => dispatch(setFullVersion(fullVersion)),
    store,
  };
};

export {
  init, // eslint-disable-line import/prefer-default-export
};
