import { type FC, type PropsWithChildren } from "react";

import { AppStoreLinkContext } from "@munchkin/web/src/utils/appStoreLinkContext";

const getAppStoreLink = () => {
  switch (window.cordova.platformId) {
    case "android":
      return "market://details?id=com.izorg.munchkin";

    case "ios":
      return "itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1448937097";

    default:
      return undefined;
  }
};

const value = {
  getAppStoreLink,
};

const AppStoreLinkProvider: FC<PropsWithChildren> = ({ children }) => (
  <AppStoreLinkContext.Provider value={value}>
    {children}
  </AppStoreLinkContext.Provider>
);

export default AppStoreLinkProvider;
