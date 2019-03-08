import createHistory from 'history/createBrowserHistory';

import './googleAnalytics';

import init from '../index';

import registerServiceWorker from './registerServiceWorker';

const dev = process.env.NODE_ENV === 'development';
const el = document.getElementById('app');
const history = createHistory();

const { host, pathname, protocol } = window.location;

const app = init(el, {
  history,
  shareLink: `${protocol}//${host}${pathname}`,
});

app.setFullVersion(true);

if (dev) {
  window.app = app;
} else {
  registerServiceWorker(app.store);
}
