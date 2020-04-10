import { createMemoryHistory } from 'history';

import init from './index';

const FULL_VERSION_ID = 'full_version';

const handleKeepWakeChange = (store) => {
  const selectKeepAwake = (state) => state.app.keepAwake;

  const setKeepAwake = (keepAwake) => {
    if (window.plugins && window.plugins.insomnia) {
      if (keepAwake) {
        window.plugins.insomnia.keepAwake();
      } else {
        window.plugins.insomnia.allowSleepAgain();
      }
    }
  };

  let currentKeepAwake = selectKeepAwake(store.getState());

  setKeepAwake(currentKeepAwake);

  store.subscribe(() => {
    const previousKeepAwake = currentKeepAwake;

    currentKeepAwake = selectKeepAwake(store.getState());

    if (previousKeepAwake !== currentKeepAwake) {
      setKeepAwake(currentKeepAwake);
    }
  });
};

const getRateLink = () => {
  const { cordova } = window;

  switch (cordova.platformId) {
    case 'android':
      return 'market://details?id=com.izorg.munchkin';

    case 'ios':
      return 'itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1448937097';

    default:
      throw new Error('No platformId found in cordova');
  }
};

const onDeviceReady = () => {
  const { cordova, store } = window;

  const Sentry = cordova.require('sentry-cordova.Sentry');

  Sentry.init({
    dsn: 'https://14fc03bd8f6249ddbd3917a950656dcc@sentry.io/1423183',
    environment: process.env.NODE_ENV,
  });

  const history = createMemoryHistory();

  const options = {
    history,
    keepAwakeSupport: true,
    privacyLink: 'https://allmunchkins.com/privacy',
    Sentry,
    shareLink: 'https://allmunchkins.com',
  };

  if (process.env.NODE_ENV === 'development') {
    store.verbosity = store.DEBUG;
  }

  store.error((error) => {
    // eslint-disable-next-line no-console
    console.log(`ERROR ${error.code}: ${error.message}`);
  });

  store.register({
    id: FULL_VERSION_ID,
    type: store.NON_CONSUMABLE,
  });

  options.buyFullVersion = () => {
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
  };
  options.rateLink = getRateLink();

  if (cordova.platformId === 'ios') {
    options.freeCombat = true;
    options.restorePurchases = () => store.refresh();
  }

  // options.buyFullVersion = function() {
  //   return Promise.resolve();
  // };

  const appEl = document.getElementById('app');
  const munchkinApp = init(appEl, options);
  const reduxStore = munchkinApp.store;

  const onBackButton = (e) => {
    e.preventDefault();

    if (history.canGo(-1)) {
      history.goBack();
    } else {
      navigator.app.exitApp();
    }
  };

  document.addEventListener('backbutton', onBackButton, false);

  handleKeepWakeChange(reduxStore);

  store.once(FULL_VERSION_ID).loaded(() => {
    munchkinApp.setFullVersion(false);
  });

  store.once(FULL_VERSION_ID).approved((product) => {
    product.finish();
  });

  store.once(FULL_VERSION_ID).owned(() => {
    munchkinApp.setFullVersion(true);
  });

  store.refresh();

  navigator.splashscreen.hide();
};

document.addEventListener('deviceready', onDeviceReady, false);
