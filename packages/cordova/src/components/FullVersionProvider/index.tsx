/// <reference types="cordova-plugin-purchase" />

import { setContext } from "@sentry/react";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { setFullVersion } from "../../../../web/src/ducks/settings";
import usePresentSelector from "../../../../web/src/hooks/usePresentSelector";
import { useAppDispatch } from "../../../../web/src/store";
import { FullVersionContext } from "../../../../web/src/utils/fullVersionContext";

const FULL_VERSION_ID = "full_version";

const { LogLevel, ProductType, store } = CdvPurchase;

if (window.BuildInfo.debug) {
  store.verbosity = LogLevel.DEBUG;
}

store.register({
  id: FULL_VERSION_ID,
  platform: store.defaultPlatform(),
  type: ProductType.NON_CONSUMABLE,
});

const restorePurchases =
  cordova.platformId === "ios" ? () => store.restorePurchases() : undefined;

class StoreError extends Error {
  public constructor(error: CdvPurchase.IError) {
    super(error.message);

    this.name = "StoreError";
    this.cause = error;

    setContext("Store", {
      code: error.code,
      platform: error.platform,
    });
  }
}

export const FullVersionProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const [offer, setOffer] = useState<CdvPurchase.Offer>();

  const fullVersion = usePresentSelector((state) => state.settings.fullVersion);

  const buyExecutorRef = useRef<{
    reject: (error: StoreError) => void;
    resolve: () => void;
  }>(undefined);

  useEffect(() => {
    store.error((error) => {
      if (buyExecutorRef.current) {
        buyExecutorRef.current.reject(new StoreError(error));

        buyExecutorRef.current = undefined;
      }
    });

    store
      .when()
      .productUpdated((product) => {
        dispatch(setFullVersion(product.owned));
      })
      .approved((transaction) => {
        if (!transaction.isAcknowledged) {
          void (async () => {
            await transaction.verify();
          })();
        }
      })
      .verified((receipt) => {
        void (async () => {
          await receipt.finish();
        })();
      })
      .finished(() => {
        dispatch(setFullVersion(true));

        buyExecutorRef.current?.resolve();
      });

    store.ready(() => {
      const fullVersionOffer = store.get(FULL_VERSION_ID)?.getOffer();

      if (fullVersionOffer?.canPurchase) {
        setOffer(fullVersionOffer);
      }
    });

    void (async () => {
      await store.initialize();
    })();
  }, [dispatch]);

  const buyFullVersion = useCallback(async (offer: CdvPurchase.Offer) => {
    const error = await offer.order();

    if (error) {
      throw new StoreError(error);
    }

    return new Promise<void>((resolve, reject) => {
      buyExecutorRef.current = {
        reject,
        resolve,
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      buyFullVersion: offer ? () => buyFullVersion(offer) : undefined,
      fullVersion,
      restorePurchases,
    }),
    [buyFullVersion, fullVersion, offer],
  );

  return (
    <FullVersionContext.Provider value={value}>
      {children}
    </FullVersionContext.Provider>
  );
};
