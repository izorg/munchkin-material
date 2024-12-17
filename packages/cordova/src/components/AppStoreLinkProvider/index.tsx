import { type FC, type PropsWithChildren } from "react";

import { AppStoreLinkContext } from "../../../../web/src/utils/appStoreLinkContext";

const appStoreLink: Partial<Record<string, string>> = {
  android: "market://details?id=com.izorg.munchkin",
  ios: "itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=1448937097",
};

const AppStoreLinkProvider: FC<PropsWithChildren> = ({ children }) => (
  <AppStoreLinkContext.Provider value={appStoreLink[window.cordova.platformId]}>
    {children}
  </AppStoreLinkContext.Provider>
);

export default AppStoreLinkProvider;
