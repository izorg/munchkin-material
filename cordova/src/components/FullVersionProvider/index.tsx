import PropTypes from "prop-types";
import { type FC, type PropsWithChildren, useCallback, useEffect } from "react";

import { setFullVersion } from "../../../../src/ducks/settings";
import usePresentSelector from "../../../../src/hooks/usePresentSelector";
import { useAppDispatch } from "../../../../src/store";
import { FullVersionContext } from "../../../../src/utils/fullVersionContext";

const FULL_VERSION_ID = "full_version";

const FullVersionProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = window.store;

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
    [dispatch, store]
  );

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
  }, [dispatch, store]);

  return (
    <FullVersionContext.Provider value={{ buyFullVersion, fullVersion }}>
      {children}
    </FullVersionContext.Provider>
  );
};

FullVersionProvider.propTypes = {
  children: PropTypes.node,
};

export default FullVersionProvider;
