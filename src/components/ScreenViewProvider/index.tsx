import { logEvent } from "firebase/analytics";
import { useEffect } from "react";

import useScreenView from "../../utils/useScreenView";

const ScreenViewProvider = () => {
  const screen = useScreenView();

  useEffect(() => {
    if (!screen) {
      return;
    }

    if (process.env.NODE_ENV === "production") {
      void (async () => {
        const { analytics } = await import("../../firebase");

        logEvent(analytics, "screen_view", {
          firebase_screen: screen,
          firebase_screen_class: screen,
        });
      })();
    }
  }, [screen]);

  return null;
};

export default ScreenViewProvider;
