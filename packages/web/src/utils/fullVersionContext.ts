import { createContext, useContext } from "react";

type FullVersionContextValue = {
  /**
   * If the store is not ready the function is not provided
   */
  buyFullVersion?: () => Promise<void>;

  fullVersion: boolean;

  restorePurchases?: () => void;
};

export const FullVersionContext = createContext<FullVersionContextValue>({
  fullVersion: true,
});

export const useFullVersion = (): FullVersionContextValue =>
  useContext(FullVersionContext);
