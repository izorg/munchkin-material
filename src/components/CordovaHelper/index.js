import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import sentry from '../../sentry';

const displayName = 'CordovaHelper';

const CordovaHelper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [deviceReady, setDeviceReady] = useState(false);

  useEffect(() => {
    const onDeviceReady = () => {
      const { BuildInfo } = window;

      if (process.env.NODE_ENV === 'production' && !BuildInfo.debug) {
        sentry('https://14fc03bd8f6249ddbd3917a950656dcc@sentry.io/1423183');
      }

      navigator.splashscreen.hide();

      if (window.cordova.platformId === 'windows') {
        const { Windows } = window;

        const currentView = Windows.UI.Core.SystemNavigationManager.getForCurrentView();

        currentView.appViewBackButtonVisibility =
          Windows.UI.Core.AppViewBackButtonVisibility.collapsed;
      }

      setDeviceReady(true);
    };

    document.addEventListener('deviceready', onDeviceReady, false);

    return () => {
      document.removeEventListener('deviceready', onDeviceReady);
    };
  }, []);

  useEffect(() => {
    if (!deviceReady) {
      return;
    }

    const onBackButton = (event) => {
      event.preventDefault();

      if (location.pathname === '/' && !location.search) {
        navigator.app.exitApp();
      } else {
        navigate(-1);
      }
    };

    document.addEventListener('backbutton', onBackButton, false);

    return () => {
      document.removeEventListener('backbutton', onBackButton);
    };
  }, [deviceReady, location.pathname, location.search, navigate]);

  if (deviceReady) {
    return children;
  }

  return null;
};

CordovaHelper.displayName = displayName;

export default CordovaHelper;
