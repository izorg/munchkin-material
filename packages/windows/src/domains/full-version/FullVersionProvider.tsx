import { type FC, type PropsWithChildren, useMemo } from "react";

import { FullVersionContext } from "../../../../web/src/utils/fullVersionContext";

/**
 * WebView in-app-purchase implementation for Windows
 */
export const FullVersionProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useMemo(
    () => ({
      buyFullVersion: () => {
        console.log("=== buyFullVersion ===");
        return Promise.resolve();
      },
      fullVersion: false,
      restorePurchases: () => {},
    }),
    [],
  );

  return (
    <FullVersionContext.Provider value={value}>
      {children}
    </FullVersionContext.Provider>
  );
};
