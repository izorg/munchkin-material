import PropTypes from "prop-types";
import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import AsyncResource from "../../utils/AsyncResource";
import { useGoBack } from "../../utils/location";

import hideWindowsBackButton from "./hideWindowsBackButton";
import useNavigationBreadcrumbs from "./useNavigationBreadcrumbs";

const cordovaResource = new AsyncResource(
  new Promise<void>((resolve) =>
    document.addEventListener(
      "deviceready",
      () => {
        if (!window.BuildInfo.debug) {
          void import("../../sentry").then(() => resolve());

          return;
        }

        resolve();
      },
      false
    )
  )
);

type CordovaProviderProps = {
  children?: ReactNode;
};

const CordovaProvider: FC<CordovaProviderProps> = ({ children }) => {
  cordovaResource.read();

  const location = useLocation();

  const [initialKey] = useState(location.key);
  const homeLocationRef = useRef(false);

  homeLocationRef.current = location.key === initialKey;

  const goBack = useGoBack();

  useEffect(() => {
    const onBackButton = (event: Event) => {
      event.preventDefault();

      if (homeLocationRef.current) {
        window.navigator.app.exitApp();
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

  return <>{children}</>;
};

CordovaProvider.propTypes = {
  children: PropTypes.node,
};

export default CordovaProvider;
