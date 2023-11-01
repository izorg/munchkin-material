import { createContext, useContext } from "react";

export type VersionContextValue = string | undefined;

export const VersionContext = createContext<VersionContextValue>(undefined);

export const useVersion = (): VersionContextValue => useContext(VersionContext);
