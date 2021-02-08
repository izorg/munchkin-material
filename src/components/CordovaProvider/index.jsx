import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

import history from "../../components/CordovaRouter/history";
import sentry from "../../sentry";
import { useGoBack } from "../../utils/location";

import useNavigationBreadcrumbs from "./useNavigationBreadcrumbs";

const displayName = "CordovaProvider";

const CordovaContext = createContext(null);

export const useCordova = () => useContext(CordovaContext);

const CordovaProvider = ({ children }) => {
  const [cordova, setCordova] = useState(null);

  const goBack = useGoBack();

  useEffect(() => {
    const onDeviceReady = () => {
      if (process.env.NODE_ENV === "production" && !window.BuildInfo.debug) {
        sentry();
      }

      setCordova(window.cordova);
    };

    document.addEventListener("deviceready", onDeviceReady, false);

    return () => {
      document.removeEventListener("deviceready", onDeviceReady);
    };
  }, []);

  useEffect(() => {
    if (!cordova) {
      return;
    }

    const onBackButton = (event) => {
      event.preventDefault();

      if (history.location.pathname === "/" && !history.location.search) {
        navigator.app.exitApp();
      } else {
        goBack();
      }
    };

    document.addEventListener("backbutton", onBackButton, false);

    if (window.cordova.platformId === "windows") {
      const { Windows } = window;

      const currentView = Windows.UI.Core.SystemNavigationManager.getForCurrentView();

      currentView.appViewBackButtonVisibility =
        Windows.UI.Core.AppViewBackButtonVisibility.collapsed;
    }

    return () => {
      document.removeEventListener("backbutton", onBackButton);
    };
  }, [cordova, goBack]);

  useNavigationBreadcrumbs();

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
