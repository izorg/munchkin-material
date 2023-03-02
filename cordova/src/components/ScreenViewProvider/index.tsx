import { useEffect } from "react";

import useScreenView from "../../../../src/utils/useScreenView";

const ScreenViewProvider = () => {
  const screen = useScreenView();

  useEffect(() => {
    if (!screen) {
      return;
    }

    void window.cordova.plugins.firebase.analytics.setCurrentScreen(screen);
  }, [screen]);

  return null;
};

export default ScreenViewProvider;
