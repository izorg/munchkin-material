/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';

// eslint-disable-next-line no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);

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
