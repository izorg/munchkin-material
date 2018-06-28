/* global MunchkinApp */

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app');

  const { host, pathname, protocol } = window.location;

  const app = MunchkinApp(el, {
    shareLink: `${protocol}//${host}${pathname}`,
  });

  if (process.env.NODE_ENV === 'development') {
    window.app = app;
  }

  app.setFullVersion(true);
});
