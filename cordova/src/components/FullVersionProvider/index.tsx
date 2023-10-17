import { captureMessage } from "@sentry/react";
import PropTypes from "prop-types";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import { setFullVersion } from "../../../../web/src/ducks/settings";
import usePresentSelector from "../../../../web/src/hooks/usePresentSelector";
import { useAppDispatch } from "../../../../web/src/store";
import { FullVersionContext } from "../../../../web/src/utils/fullVersionContext";

const FULL_VERSION_ID = "full_version";

const FullVersionProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Platform, ProductType, store } = CdvPurchase;

  const dispatch = useAppDispatch();

  const fullVersion = usePresentSelector((state) => state.settings.fullVersion);

  const buyFullVersion = useCallback(async () => {
    const product = store.get(FULL_VERSION_ID);

    await product?.getOffer()?.order();
  }, [store]);

  const restorePurchases = useCallback(() => {
    void store.restorePurchases();
  }, [store]);

  useEffect(() => {
    const platformMapping: Record<string, CdvPurchase.Platform> = {
      android: Platform.GOOGLE_PLAY,
      ios: Platform.APPLE_APPSTORE,
    };

    const platform = platformMapping[cordova.platformId];

    if (!platform) {
      return;
    }

    store.error((error) => {
      const { code, message } = error;

      captureMessage(String(code), {
        extra: {
          message,
        },
      });
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
