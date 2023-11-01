import { createContext, useContext } from "react";

export type FullVersionContextValue = {
  buyFullVersion: () => Promise<void>;
  fullVersion: boolean;
  restorePurchases?: () => void;
};

export const FullVersionContext = createContext<FullVersionContextValue>({
  buyFullVersion: () => {
    throw new Error("No <FullVersionProvider />");
  },
  fullVersion: true,
});

export const useFullVersion = (): FullVersionContextValue =>
  useContext(FullVersionContext);
