import PropTypes from 'prop-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFullVersion } from '../../ducks/settings';

const FULL_VERSION_ID = 'full_version';

const displayName = 'FullVersionProvider';

const FullVersionContext = createContext({
  buyFullVersion: () => {
    throw new Error('No <FullVersionProvider />');
  },
  fullVersion: true,
});

export const useFullVersion = () => useContext(FullVersionContext);

const FullVersionProvider = ({ children }) => {
  const { cordova, store } = window;

  const dispatch = useDispatch();

  const fullVersion = useSelector((state) => state.settings.fullVersion);

  const buyFullVersion = useCallback(
    () =>
      new Promise((resolve, reject) => {
        const product = store.get(FULL_VERSION_ID);

        store.once(FULL_VERSION_ID).owned(() => {
          dispatch(setFullVersion(true));

          resolve();
        });

        store.once(FULL_VERSION_ID).cancelled(() => {
          reject();
        });

        store.order(product);
      }),
    [dispatch, store],
  );

  useEffect(() => {
    if (!cordova) {
      dispatch(setFullVersion(true));

      return;
    }

    if (!store) {
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
    <FullVersionContext.Provider value={{ buyFullVersion, fullVersion }}>
      {children}
    </FullVersionContext.Provider>
  );
};

FullVersionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

FullVersionProvider.displayName = displayName;

export default FullVersionProvider;
