import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import sentry from '../../sentry';
import { useGoBack } from '../../utils/location';

const displayName = 'CordovaProvider';

const CordovaContext = createContext(null);

export const useCordova = () => useContext(CordovaContext);

const CordovaProvider = ({ children }) => {
  const location = useLocation();

  const [cordova, setCordova] = useState(null);

  const goBack = useGoBack();

  useEffect(() => {
    const onDeviceReady = () => {
      const { BuildInfo } = window;

      if (process.env.NODE_ENV === 'production' && !BuildInfo.debug) {
        sentry();
      }

      if (window.cordova.platformId === 'windows') {
        const { Windows } = window;

        const currentView = Windows.UI.Core.SystemNavigationManager.getForCurrentView();

        currentView.appViewBackButtonVisibility =
          Windows.UI.Core.AppViewBackButtonVisibility.collapsed;
      }

      setCordova(window.cordova);
    };

    document.addEventListener('deviceready', onDeviceReady, false);

    return () => {
      document.removeEventListener('deviceready', onDeviceReady);
    };
  }, []);

  useEffect(() => {
    if (!cordova) {
      return;
    }

    const onBackButton = (event) => {
      event.preventDefault();

      if (location.pathname === '/' && !location.search) {
        navigator.app.exitApp();
      } else {
        goBack();
      }
    };

    document.addEventListener('backbutton', onBackButton, false);

    return () => {
      document.removeEventListener('backbutton', onBackButton);
    };
  }, [cordova, goBack, location.pathname, location.search]);

  if (!cordova) {
    return null;
  }

  return (
    <CordovaContext.Provider value={cordova}>
      {children}
    </CordovaContext.Provider>
  );
};

CordovaProvider.propTypes = {
  children: PropTypes.node,
};

CordovaProvider.displayName = displayName;

export default CordovaProvider;
