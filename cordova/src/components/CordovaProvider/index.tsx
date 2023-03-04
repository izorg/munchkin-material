import PropTypes from "prop-types";
import {
  type FC,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import { useGoBack } from "../../../../web/src/utils/location";

import hideWindowsBackButton from "./hideWindowsBackButton";
import useNavigationBreadcrumbs from "./useNavigationBreadcrumbs";

const CordovaProvider: FC<PropsWithChildren> = ({ children }) => {
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
