import { createBrowserHistory } from 'history';
import { Workbox } from 'workbox-window';

import { showUpdate } from '../ducks/update';
import init from '../index';

import './firebase';

import Sentry from './sentry';

const dev = process.env.NODE_ENV === 'development';

const el = document.getElementById('app');

const history = createBrowserHistory();

const app = init(el, {
  history,
  Sentry,
});

if (dev) {
  window.app = app;
} else if ('serviceWorker' in navigator) {
  const workbox = new Workbox('/service-worker.js');

  workbox.addEventListener('waiting', () => {
    app.store.dispatch(showUpdate());

    const prevUpdate = app.store.getState().update;

    app.store.subscribe(() => {
      if (app.store.getState().update === false && prevUpdate === true) {
        workbox.addEventListener('controlling', () => {
          window.location.reload();
        });

        workbox.messageSW({ type: 'SKIP_WAITING' });
      }
    });
  });

  workbox.register();
}
