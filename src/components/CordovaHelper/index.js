import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import sentry from '../../sentry';

const displayName = 'CordovaHelper';

const CordovaHelper = ({ children }) => {
  const history = useHistory();

  const [deviceReady, setDeviceReady] = useState(false);

  useEffect(() => {
    const onDeviceReady = () => {
      const { BuildInfo } = window;

      if (process.env.NODE_ENV === 'production' && !BuildInfo.debug) {
        sentry(
          'cordova',
          'https://14fc03bd8f6249ddbd3917a950656dcc@sentry.io/1423183',
        );
      }

      navigator.splashscreen.hide();

      if (window.cordova.platformId === 'windows') {
        const { Windows } = window;

        const currentView = Windows.UI.Core.SystemNavigationManager.getForCurrentView();

        currentView.appViewBackButtonVisibility =
          Windows.UI.Core.AppViewBackButtonVisibility.collapsed;
      }

      const onBackButton = (event) => {
        event.preventDefault();

        if (history.canGo(-1)) {
          history.goBack();
        } else {
          navigator.app.exitApp();
        }
      };

      document.addEventListener('backbutton', onBackButton, false);

      setDeviceReady(true);
    };

    document.addEventListener('deviceready', onDeviceReady, false);
  }, [history]);

  if (deviceReady) {
    return children;
  }

  return null;
};

CordovaHelper.displayName = displayName;

export default CordovaHelper;
