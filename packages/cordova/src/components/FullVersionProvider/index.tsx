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

const FullVersionProvider: FC<PropsWithChildren> = ({ children }) => {
  const { LogLevel, Platform, ProductType, store } = CdvPurchase;

  store.verbosity = LogLevel.DEBUG;

  const dispatch = useAppDispatch();

  const fullVersion = usePresentSelector((state) => state.settings.fullVersion);

  const buyExecutorRef = useRef<{
    reject: (error: Error) => void;
    resolve: () => void;
  }>();

  const shopErrorRef = useRef<CdvPurchase.IError>();

  const buyFullVersion = useCallback(async () => {
    const offer = store.get(FULL_VERSION_ID)?.getOffer();

    if (!offer) {
      throw new Error(shopErrorRef.current?.message ?? "");
    }

    const error = await offer.order();

    if (error) {
      throw new Error(error.message);
    }

    return new Promise<void>((resolve, reject) => {
      buyExecutorRef.current = {
        reject,
        resolve,
      };
    });
  }, [store]);

  const restorePurchases = useCallback(() => {
    void store.restorePurchases();
  }, [store]);

  useEffect(() => {
    const platformMapping: Record<
      typeof cordova.platformId,
      CdvPurchase.Platform
    > = {
      android: Platform.GOOGLE_PLAY,
      ios: Platform.APPLE_APPSTORE,
    };

    const platform = platformMapping[cordova.platformId];

    if (!platform) {
      return;
    }

    store.error((error) => {
      shopErrorRef.current = error;
      buyExecutorRef.current?.reject(new Error(error.message));
    });

    store.register({
      id: FULL_VERSION_ID,
      platform,
      type: ProductType.NON_CONSUMABLE,
    });

    store
      .when()
      .productUpdated((product) => {
        dispatch(setFullVersion(product.owned));
      })
      .approved((transaction) => {
        if (!transaction.isAcknowledged) {
          void transaction.verify();
        }
      })
      .verified((receipt) => {
        void receipt.finish();
      })
      .finished(() => {
        dispatch(setFullVersion(true));

        buyExecutorRef.current?.resolve();
      });

    void store.initialize();
  }, [
    Platform.APPLE_APPSTORE,
    Platform.GOOGLE_PLAY,
    ProductType.NON_CONSUMABLE,
    dispatch,
    store,
  ]);

  const value = useMemo(
    () => ({
      buyFullVersion,
      fullVersion,
      restorePurchases:
        cordova.platformId === "ios" ? restorePurchases : undefined,
    }),
    [buyFullVersion, fullVersion, restorePurchases],
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
