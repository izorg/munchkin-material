import { createContext, useContext } from "react";

export type AppRateContextValue = {
  getAppStoreLink: () => string | undefined;
};

export const AppStoreLinkContext = createContext<AppRateContextValue>({
  getAppStoreLink: () => undefined,
});

export const useAppStoreLink = (): AppRateContextValue =>
  useContext(AppStoreLinkContext);
