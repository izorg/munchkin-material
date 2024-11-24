import { logEvent } from "firebase/analytics";
import useSWRImmutable from "swr/immutable";

import useScreenView from "../../utils/useScreenView";

const screenViewFetcher = async (screen: string) => {
  if (process.env.NODE_ENV === "production") {
    const { analytics } = await import("../../firebase");

    logEvent(analytics, "screen_view", {
      firebase_screen: screen,
      firebase_screen_class: screen,
    });
  }
};

const ScreenViewProvider = () => {
  const screen = useScreenView();

  useSWRImmutable(screen, screenViewFetcher);

  return null;
};

export default ScreenViewProvider;
