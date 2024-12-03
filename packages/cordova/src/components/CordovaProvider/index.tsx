import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

import { useGoBack } from "../../../../web/src/utils/location";

import useNavigationBreadcrumbs from "./useNavigationBreadcrumbs";

const CordovaProvider = () => {
  const location = useLocation();

  const initialKeyRef = useRef(location.key);
  const homeLocationRef = useRef(false);

  homeLocationRef.current = location.key === initialKeyRef.current;

  const goBack = useGoBack();

  useEffect(() => {
    const onBackButton = async (event: Event) => {
      event.preventDefault();

      if (homeLocationRef.current) {
        window.navigator.app.exitApp();
      } else {
        await goBack();
      }
    };

    document.addEventListener("backbutton", onBackButton, false);

    return () => {
      document.removeEventListener("backbutton", onBackButton);
    };
  }, [goBack]);

  useNavigationBreadcrumbs();

  return null;
};

export default CordovaProvider;
