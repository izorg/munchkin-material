import { createMemoryHistory } from 'history';

import init from './index';

const onDeviceReady = () => {
  const { cordova } = window;

  const Sentry = cordova.require('sentry-cordova.Sentry');

  Sentry.init({
    dsn: 'https://14fc03bd8f6249ddbd3917a950656dcc@sentry.io/1423183',
    environment: process.env.NODE_ENV,
  });

  const history = createMemoryHistory();

  const appEl = document.getElementById('app');
  init(appEl, {
    history,
    Sentry,
  });

  const onBackButton = (e) => {
    e.preventDefault();

    if (history.canGo(-1)) {
      history.goBack();
    } else {
      navigator.app.exitApp();
    }
  };

  document.addEventListener('backbutton', onBackButton, false);

  navigator.splashscreen.hide();
};

document.addEventListener('deviceready', onDeviceReady, false);
