/* eslint-disable no-console */
/* global cordova */
import { createHashHistory, createMemoryHistory } from 'history';

import init from './index';

(() => {
  const FULL_VERSION_ID = 'full_version';

  function initStore() {
    if (!window.store) {
      console.log('Store not available');
      return undefined;
    }

    const { store } = window;

    if (process.env.NODE_ENV === 'development') {
      store.verbosity = store.DEBUG;
    }

    store.error((error) => {
      console.log(`ERROR ${error.code}: ${error.message}`);
    });

    store.register({
      id: FULL_VERSION_ID,
      type: store.NON_CONSUMABLE,
    });

    return store;
  }

  function handleKeepWakeChange(store) {
    function selectKeepAwake(state) {
      return state.app.keepAwake;
    }

    function setKeepAwake(keepAwake) {
      if (window.plugins && window.plugins.insomnia) {
        if (keepAwake) {
          window.plugins.insomnia.keepAwake();
        } else {
          window.plugins.insomnia.allowSleepAgain();
        }
      }
    }

    let currentKeepAwake = selectKeepAwake(store.getState());

    setKeepAwake(currentKeepAwake);

    store.subscribe(() => {
      const previousKeepAwake = currentKeepAwake;

      currentKeepAwake = selectKeepAwake(store.getState());

      if (previousKeepAwake !== currentKeepAwake) {
        setKeepAwake(currentKeepAwake);
      }
    });
  }

  function getRateLink() {
    switch (cordova.platformId) {
      case 'android':
        return 'market://details?id=com.izorg.munchkin';

      case 'ios':
        return 'itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1448937097';

      default:
        throw new Error('No platformId found in cordova');
    }
  }

  const cordovaApp = {
    init() {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false,
      );
    },

    onBackButton(history, e) {
      e.preventDefault();

      if (history.canGo(-1)) {
        history.goBack();
      } else {
        navigator.app.exitApp();
      }
    },

    buyFullVersion(store) {
      return new Promise((resolve, reject) => {
        const product = store.get(FULL_VERSION_ID);

        store.once(FULL_VERSION_ID).owned(() => {
          resolve();
        });

        store.once(FULL_VERSION_ID).cancelled(() => {
          reject();
        });

        store.order(product);
      });
    },

    restorePurchases(store) {
      store.refresh();
    },

    onDeviceReady() {
      let Sentry;

      if (cordova.platformId !== 'browser') {
        Sentry = cordova.require('sentry-cordova.Sentry');

        Sentry.init({
          dsn: 'https://14fc03bd8f6249ddbd3917a950656dcc@sentry.io/1423183',
          environment: process.env.NODE_ENV,
        });
      }

      const history =
        cordova.platformId === 'browser'
          ? createHashHistory()
          : createMemoryHistory();

      const playStore = initStore();
      const options = {
        history,
        keepAwakeSupport: true,
        privacyLink: 'https://allmunchkins.com/privacy',
        Sentry,
        shareLink: 'https://allmunchkins.com',
      };

      if (playStore) {
        options.buyFullVersion = this.buyFullVersion.bind(this, playStore);
        options.rateLink = getRateLink();

        if (cordova.platformId === 'ios') {
          options.freeCombat = true;
          options.restorePurchases = this.restorePurchases.bind(
            this,
            playStore,
          );
        }
      }

      // options.buyFullVersion = function() {
      //   return Promise.resolve();
      // };

      const appEl = document.getElementById('app');
      const munchkinApp = init(appEl, options);
      const reduxStore = munchkinApp.store;

      document.addEventListener(
        'backbutton',
        this.onBackButton.bind(this, history),
        false,
      );

      handleKeepWakeChange(reduxStore);

      if (playStore) {
        playStore.once(FULL_VERSION_ID).loaded(() => {
          munchkinApp.setFullVersion(false);
        });

        playStore.once(FULL_VERSION_ID).approved((product) => {
          product.finish();
        });

        playStore.once(FULL_VERSION_ID).owned(() => {
          munchkinApp.setFullVersion(true);
        });

        playStore.refresh();
      }

      if (navigator.splashscreen) {
        navigator.splashscreen.hide();
      }
    },
  };

  cordovaApp.init();
})();
