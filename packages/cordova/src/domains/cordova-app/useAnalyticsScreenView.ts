/// <reference types="cordova-plugin-firebase-analytics" />

import useSWRImmutable from "swr/immutable";

import useScreenView from "../../../../web/src/utils/useScreenView";

const screenViewFetcher = async (screenName: string) => {
  await cordova.plugins.firebase.analytics.setCurrentScreen(screenName);
};

export const useAnalyticsScreenView = () => {
  const screen = useScreenView();

  useSWRImmutable(screen, screenViewFetcher);
};
