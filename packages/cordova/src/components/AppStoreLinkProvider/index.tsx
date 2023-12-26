import { type FC, type PropsWithChildren, useMemo } from "react";

import { AppStoreLinkContext } from "../../../../web/src/utils/appStoreLinkContext";

const getAppStoreLink = () => {
  const { platformId } = window.cordova;

  switch (platformId) {
    case "android": {
      return "market://details?id=com.izorg.munchkin";
    }

    case "ios": {
      return "itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1448937097";
    }

    default: {
      throw new Error(`Unknown platform "${platformId}"`);
    }
  }
};

const AppStoreLinkProvider: FC<PropsWithChildren> = ({ children }) => (
  <AppStoreLinkContext.Provider value={useMemo(getAppStoreLink, [])}>
    {children}
  </AppStoreLinkContext.Provider>
);

export default AppStoreLinkProvider;
