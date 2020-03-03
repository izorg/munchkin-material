/* eslint-disable */
import { createHashHistory, createMemoryHistory } from 'history';

(function() {
  var FULL_VERSION_ID = 'full_version';

  function initStore() {
    if (!window.store) {
      console.log('Store not available');
      return;
    }

    var store = window.store;

    if (process.env.NODE_ENV === 'development') {
      store.verbosity = store.DEBUG;
    }

    store.error(function(error) {
      console.log('ERROR ' + error.code + ': ' + error.message);
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

    var currentKeepAwake = selectKeepAwake(store.getState());

    setKeepAwake(currentKeepAwake);

    store.subscribe(function() {
      var previousKeepAwake = currentKeepAwake;

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
        return;
    }
  }

  var cordovaApp = {
    init: function() {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false,
      );
    },

    onBackButton: function(history, e) {
      e.preventDefault();

      if (history.canGo(-1)) {
        history.goBack();
      } else {
        navigator.app.exitApp();
      }
    },

    buyFullVersion: function(store) {
      return new Promise(function(resolve, reject) {
        var product = store.get(FULL_VERSION_ID);

        store.once(FULL_VERSION_ID).owned(function() {
          resolve();
        });

        store.once(FULL_VERSION_ID).cancelled(function() {
          reject();
        });

        store.order(product);
      });
    },

    restorePurchases: function(store) {
      store.refresh();
    },

    onDeviceReady: function() {
      var Sentry;

      if (cordova.platformId !== 'browser') {
        Sentry = cordova.require('sentry-cordova.Sentry');

        Sentry.init({
          dsn: 'https://14fc03bd8f6249ddbd3917a950656dcc@sentry.io/1423183',
          environment: process.env.NODE_ENV,
        });
      }

      var history =
        cordova.platformId === 'browser'
          ? createHashHistory()
          : createMemoryHistory();

      var playStore = initStore();
      var options = {
        history: history,
        keepAwakeSupport: true,
        privacyLink: 'https://allmunchkins.com/privacy',
        Sentry: Sentry,
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

      var appEl = document.getElementById('app');
      var munchkinApp = new MunchkinApp(appEl, options);
      var reduxStore = munchkinApp.store;

      document.addEventListener(
        'backbutton',
        this.onBackButton.bind(this, history),
        false,
      );

      handleKeepWakeChange(reduxStore);

      if (playStore) {
        playStore.once(FULL_VERSION_ID).loaded(function() {
          munchkinApp.setFullVersion(false);
        });

        playStore.once(FULL_VERSION_ID).approved(function(product) {
          product.finish();
        });

        playStore.once(FULL_VERSION_ID).owned(function() {
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
