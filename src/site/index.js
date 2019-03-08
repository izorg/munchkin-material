import createHistory from 'history/createBrowserHistory';
import * as Sentry from '@sentry/browser';

import './googleAnalytics';

import init from '../index';

import registerServiceWorker from './registerServiceWorker';

const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';

const el = document.getElementById('app');

const history = createHistory();

const { host, pathname, protocol } = window.location;

if (prod) {
  Sentry.init({
    dsn: 'https://41e93153dfb94d9db3ed8a2cbc7228a9@sentry.io/253536',
    environment: process.env.NODE_ENV,
    release: VERSION,
  });
}

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
