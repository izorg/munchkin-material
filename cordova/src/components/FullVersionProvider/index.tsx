import { captureException } from "@sentry/react";
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
  const dispatch = useAppDispatch();

  const fullVersion = usePresentSelector((state) => state.settings.fullVersion);

  const buyFullVersion = useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        store
          .once(FULL_VERSION_ID)
          .owned(() => {
            resolve();
          })
          .cancelled(() => {
            reject();
          });

        store.order(FULL_VERSION_ID);
      }),
    []
  );

  const restorePurchases = useCallback(() => {
    store.refresh();
  }, []);

  useEffect(() => {
    store.error((error) => {
      captureException(error);
    });

    store.register({
      id: FULL_VERSION_ID,
      type: store.NON_CONSUMABLE,
    });

    store
      .when(FULL_VERSION_ID)
      .loaded(() => {
        dispatch(setFullVersion(false));
      })
      .approved((product) => {
        product.finish();
      })
      .owned(() => {
        dispatch(setFullVersion(true));
      });

    store.refresh();
  }, [dispatch]);

  const value = useMemo(
    () => ({
      buyFullVersion,
      fullVersion,
      restorePurchases:
        cordova.platformId === "ios" ? restorePurchases : undefined,
    }),
    [buyFullVersion, fullVersion, restorePurchases]
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
