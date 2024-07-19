import { setContext } from "@sentry/react";
import PropTypes from "prop-types";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { setFullVersion } from "../../../../web/src/ducks/settings";
import usePresentSelector from "../../../../web/src/hooks/usePresentSelector";
import { useAppDispatch } from "../../../../web/src/store";
import { FullVersionContext } from "../../../../web/src/utils/fullVersionContext";

const FULL_VERSION_ID = "full_version";

const { LogLevel, ProductType, store } = CdvPurchase;

store.verbosity = LogLevel.DEBUG;

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

    setContext("Store", {
      code: error.code,
      platform: error.platform,
    });
  }
}

const FullVersionProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const fullVersion = usePresentSelector((state) => state.settings.fullVersion);

  const buyExecutorRef = useRef<{
    reject: (error: StoreError) => void;
    resolve: () => void;
  }>();

  const buyFullVersion = useCallback(async () => {
    const offer = store.get(FULL_VERSION_ID)?.getOffer();

    if (!offer) {
      throw new Error("No offer");
    }

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

    void (async () => {
      await store.initialize();
    })();
  }, [dispatch]);

  const value = useMemo(
    () => ({
      buyFullVersion,
      fullVersion,
      restorePurchases,
    }),
    [buyFullVersion, fullVersion],
  );

  return (
    <FullVersionContext.Provider value={value}>
      {children}
    </FullVersionContext.Provider>
  );
};

FullVersionProvider.propTypes = {
  children: PropTypes.node,
};

export default FullVersionProvider;
