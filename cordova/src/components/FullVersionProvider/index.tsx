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
        if (!store) {
          return reject();
        }

        store.once(FULL_VERSION_ID).owned(() => {
          dispatch(setFullVersion(true));

          resolve();
        });

        store.once(FULL_VERSION_ID).cancelled(() => {
          reject();
        });

        store.order(FULL_VERSION_ID);
      }),
    [dispatch]
  );

  const restorePurchases = useCallback(() => {
    store?.refresh();
  }, []);

  useEffect(() => {
    if (!store) {
      console.warn("Store not available");
      return;
    }

    // store.verbosity = store.DEBUG;

    store.error((error) => {
      console.error(`ERROR ${error.code}: ${error.message}`);
    });

    store.register({
      id: FULL_VERSION_ID,
      type: store.NON_CONSUMABLE,
    });

    store.once(FULL_VERSION_ID).loaded(() => {
      dispatch(setFullVersion(false));
    });

    store.once(FULL_VERSION_ID).approved((product) => {
      product.finish();
    });

    store.once(FULL_VERSION_ID).owned(() => {
      dispatch(setFullVersion(true));
    });

    store.refresh();
  }, [dispatch]);

  const value = useMemo(() => {
    return {
      buyFullVersion,
      fullVersion,
      restorePurchases:
        cordova?.platformId === "ios" ? restorePurchases : undefined,
    };
  }, [buyFullVersion, fullVersion, restorePurchases]);

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
