import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import history from "../../components/CordovaRouter/history";
import sentry from "../../sentry";
import { useGoBack } from "../../utils/location";

import hideWindowsBackButton from "./hideWindowsBackButton";
import useNavigationBreadcrumbs from "./useNavigationBreadcrumbs";

const displayName = "CordovaProvider";

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
      hideWindowsBackButton();
    }

    return () => {
      document.removeEventListener("backbutton", onBackButton);
    };
  }, [cordova, goBack]);

  useNavigationBreadcrumbs();

  if (!cordova) {
    return null;
  }

  return children;
};

CordovaProvider.propTypes = {
  children: PropTypes.node,
};

CordovaProvider.displayName = displayName;

export default CordovaProvider;
