import { showUpdate } from './ducks/update';

// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users

const onNewServiceWorker = (registration, callback) => {
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    return callback();
  }

  function listenInstalledStateChange() {
    registration.installing.addEventListener('statechange', (event) => {
      if (event.target.state === 'installed') {
        // A new service worker is available, inform the user
        callback();
      }
    });
  }

  if (registration.installing) {
    return listenInstalledStateChange();
  }

  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  return registration.addEventListener(
    'updatefound',
    listenInstalledStateChange,
  );
};

export default (store) => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      const registration = await navigator.serviceWorker.register(
        '/service-worker.js',
      );

      // Track updates to the Service Worker.
      if (!navigator.serviceWorker.controller) {
        // The window client isn't currently controlled so it's a new service
        // worker that will activate immediately
        return;
      }

      // When the user asks to refresh the UI, we'll need to reload the window
      let preventDevToolsReloadLoop;

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Ensure refresh is only called once.
        // This works around a bug in "force update on reload".
        if (preventDevToolsReloadLoop) {
          return;
        }

        preventDevToolsReloadLoop = true;

        window.location.reload();
      });

      onNewServiceWorker(registration, () => {
        store.dispatch(showUpdate());

        const unsubscribe = store.subscribe(() => {
          if (!store.getState().update) {
            unsubscribe();

            registration.waiting.postMessage('skipWaiting');
          }
        });
      });
    });
  }
};
