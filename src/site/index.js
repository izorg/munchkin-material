import { createBrowserHistory } from 'history';
import { Workbox } from 'workbox-window';

import { showUpdate } from '../ducks/update';
import init from '../index';

import './firebase';

import Sentry from './sentry';

const dev = process.env.NODE_ENV === 'development';

const el = document.getElementById('app');

const history = createBrowserHistory();

const { host, pathname, protocol } = window.location;

const app = init(el, {
  history,
  Sentry,
  shareLink: `${protocol}//${host}${pathname}`,
});

app.setFullVersion(true);

if (dev) {
  window.app = app;
} else if ('serviceWorker' in navigator) {
  const wb = new Workbox('/service-worker.js');

  wb.addEventListener('waiting', () => {
    app.store.dispatch(showUpdate());

    const prevUpdate = app.store.getState().update;

    app.store.subscribe(() => {
      if (app.store.getState().update === false && prevUpdate === true) {
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });

        wb.messageSW({ type: 'SKIP_WAITING' });
      }
    });
  });

  wb.register();
}
