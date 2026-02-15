import { type FC, type PropsWithChildren, useEffect, useMemo } from "react";

import { setFullVersion } from "@munchkin/web/src/ducks/settings";
import usePresentSelector from "@munchkin/web/src/hooks/usePresentSelector";
import { useAppDispatch } from "@munchkin/web/src/store";
import { FullVersionContext } from "@munchkin/web/src/utils/fullVersionContext";

declare global {
  var chrome: {
    webview: {
      addEventListener: <T>(
        message: string,
        handler: (event: { data: T }) => void,
      ) => void;
      postMessage: (message: string) => void;
    };
  };
}

/**
 * WebView in-app-purchase implementation for Windows
 */
export const FullVersionProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const fullVersion = usePresentSelector((state) => state.settings.fullVersion);

  useEffect(() => {
    globalThis.chrome.webview.addEventListener(
      "message",
      ({ data }) => {
        // @ts-expect-error -- will type later
        const { purchased } = data;

        dispatch(setFullVersion(Boolean(purchased)));
      },
      // @ts-expect-error -- will type later
      {
        once: true,
      },
    );

    globalThis.chrome.webview.postMessage("getIapStatus");
  }, [dispatch]);

  const value = useMemo(
    () => ({
      buyFullVersion: () => {
        const promise = new Promise<void>((resolve, reject) => {
          globalThis.chrome.webview.addEventListener(
            "message",
            ({ data }) => {
              // @ts-expect-error -- will type later
              if (data.type === "iapStatus") {
                // @ts-expect-error -- will type later
                const { purchased } = data;

                if (purchased) {
                  dispatch(setFullVersion(Boolean(purchased)));

                  return resolve();
                } else {
                  return reject(new Error("Not purchased"));
                }
              }
            },
            // @ts-expect-error -- will type later
            {
              once: false,
            },
          );
        });

        globalThis.chrome.webview.postMessage("purchaseFullVersion");

        return promise;
      },
      fullVersion,
    }),
    [dispatch, fullVersion],
  );

  return (
    <FullVersionContext.Provider value={value}>
      {children}
    </FullVersionContext.Provider>
  );
};
