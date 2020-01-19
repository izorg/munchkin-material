import { createBrowserHistory } from 'history';

import init from '../index';

import './firebase';
import registerServiceWorker from './registerServiceWorker';

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
} else {
  registerServiceWorker(app.store);
}
