import init from './index';

const el = document.getElementById('app');

const { host, pathname, protocol } = window.location;

const app = init(el, {
  shareLink: `${protocol}//${host}${pathname}`,
});

app.setFullVersion(true);

if (process.env.NODE_ENV === 'development') {
  window.app = app;
}
