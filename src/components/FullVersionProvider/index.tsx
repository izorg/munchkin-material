import PropTypes from "prop-types";
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { setFullVersion } from "../../ducks/settings";
import usePresentSelector from "../../hooks/usePresentSelector";
import { useAppDispatch } from "../../store";

const FULL_VERSION_ID = "full_version";

type FullVersionContext = {
  buyFullVersion: () => Promise<void>;
  fullVersion: boolean;
};

const Context = createContext<FullVersionContext>({
  buyFullVersion: () => {
    throw new Error("No <FullVersionProvider />");
  },
  fullVersion: true,
});

export const useFullVersion = (): FullVersionContext => useContext(Context);

const FullVersionProvider: FC<PropsWithChildren> = ({ children }) => {
  const { cordova, store } = window;

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
  }, [cordova, dispatch, store]);

  return (
    <Context.Provider value={{ buyFullVersion, fullVersion }}>
      {children}
    </Context.Provider>
  );
};

FullVersionProvider.propTypes = {
  children: PropTypes.node,
};

export default FullVersionProvider;
