import PropTypes from "prop-types";
import { type FC, type PropsWithChildren, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useGoBack } from "../../../../web/src/utils/location";

import useNavigationBreadcrumbs from "./useNavigationBreadcrumbs";

const CordovaProvider: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const initialKeyRef = useRef(location.key);
  const homeLocationRef = useRef(false);

  homeLocationRef.current = location.key === initialKeyRef.current;

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

export default CordovaProvider;
