import { createContext, useContext } from "react";

export const AppStoreLinkContext = createContext<string | undefined>(undefined);

export const useAppStoreLink = () => useContext(AppStoreLinkContext);
