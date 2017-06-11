import { applyUpdate, install } from 'offline-plugin/runtime';

install({
  onUpdateReady: () => {
    // Tells to new SW to take control immediately
    applyUpdate();
  },

  onUpdated: () => {
    // Reload the page to load into the new version
    window.location.reload();
  },
});
