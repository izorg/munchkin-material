import PropTypes from "prop-types";
import { useEffect } from "react";

import history from "../../components/CordovaRouter/history";
import AsyncResource from "../../utils/AsyncResource";
import { useGoBack } from "../../utils/location";

import hideWindowsBackButton from "./hideWindowsBackButton";
import useNavigationBreadcrumbs from "./useNavigationBreadcrumbs";

const displayName = "CordovaProvider";

const cordovaResource = new AsyncResource(
  new Promise((resolve) =>
    document.addEventListener(
      "deviceready",
      () => {
        resolve();
      },
      false
    )
  ).then(async () => {
    if (process.env.NODE_ENV === "production" && !window.BuildInfo.debug) {
      await import("../../sentry");
    }
  })
);

const CordovaProvider = ({ children }) => {
  cordovaResource.read();

  const goBack = useGoBack();

  useEffect(() => {
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
  }, [goBack]);

  useNavigationBreadcrumbs();

  return children;
};

CordovaProvider.propTypes = {
  children: PropTypes.node,
};

CordovaProvider.displayName = displayName;

export default CordovaProvider;
