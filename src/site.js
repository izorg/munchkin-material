/* global MunchkinApp */

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app');
  const app = MunchkinApp(el);

  if (process.env.NODE_ENV === 'development') {
    window.app = app;
  }

  app.setFullVersion(true);
});
