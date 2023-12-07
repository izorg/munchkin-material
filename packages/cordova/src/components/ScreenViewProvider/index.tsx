import useSWRImmutable from "swr/immutable";

import useScreenView from "../../../../web/src/utils/useScreenView";

const screenViewFetcher = async (screenName: string) => {
  await window.cordova.plugins.firebase.analytics.setCurrentScreen(screenName);
};

const ScreenViewProvider = () => {
  const screen = useScreenView();

  useSWRImmutable(screen, screenViewFetcher);

  return null;
};

export default ScreenViewProvider;
