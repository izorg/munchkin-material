/* global munchkin */

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app');
  const app = munchkin.init(el);

  if (process.env.NODE_ENV === 'development') {
    window.app = app;
  }

  app.setFullVersion(true);
});
