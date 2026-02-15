import { useEffect, useEffectEvent, useRef } from "react";
import { useLocation } from "react-router";

import { useGoBack } from "@munchkin/web";

export const useExitApp = () => {
  const location = useLocation();

  const initialKeyRef = useRef(location.key);

  const goBack = useGoBack();

  const onBackButton = useEffectEvent(async (event: Event) => {
    event.preventDefault();

    if (location.key === initialKeyRef.current) {
      globalThis.navigator.app.exitApp();
    } else {
      await goBack();
    }
  });

  useEffect(() => {
    document.addEventListener("backbutton", onBackButton, false);

    return () => {
      document.removeEventListener("backbutton", onBackButton);
    };
  }, [goBack]);
};
