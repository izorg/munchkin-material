import PropTypes from 'prop-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setKeepAwake } from '../../ducks/app';

const displayName = 'WakeLockProvider';

const WakeLockContext = createContext({
  setWakeLock: () => {
    throw new Error('No <WakeLockProvider />');
  },
  wakeLock: false,
  wakeLockSupport: false,
});

export const useWakeLock = () => useContext(WakeLockContext);

const WakeLockProvider = ({ children }) => {
  const dispatch = useDispatch();

  const insomnia = window?.plugins?.insomnia;
  const wakeLockSupport = !!insomnia;
  const wakeLock = useSelector((state) => state.app.keepAwake);

  const setWakeLock = useCallback(
    /**
     * @param {boolean} value
     */
    (value) => {
      if (!wakeLockSupport) {
        throw new Error('Calling setWakeLock() without wakeLockSupport');
      }

      dispatch(setKeepAwake(value));
    },
    [dispatch, wakeLockSupport],
  );

  useEffect(() => {
    if (!wakeLockSupport) {
      return;
    }

    if (wakeLock) {
      insomnia.keepAwake();
    } else {
      insomnia.allowSleepAgain();
    }
  }, [insomnia, wakeLock, wakeLockSupport]);

  return (
    <WakeLockContext.Provider
      value={{ setWakeLock, wakeLock, wakeLockSupport }}
    >
      {children}
    </WakeLockContext.Provider>
  );
};

WakeLockProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

WakeLockProvider.displayName = displayName;

export default WakeLockProvider;
