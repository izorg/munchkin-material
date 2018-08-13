/* global workbox */
/* eslint-disable no-restricted-globals,no-underscore-dangle */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
self.addEventListener('message', (event) => {
  if (!event.data) {
    return;
  }

  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;

    default:
      // NOOP
      break;
  }
});
