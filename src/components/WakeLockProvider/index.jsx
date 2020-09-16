import PropTypes from 'prop-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setKeepAwake } from '../../ducks/settings';

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

  const insomnia = window.plugins?.insomnia;
  const wakeLockSupport = !!insomnia || 'wakeLock' in navigator;
  const wakeLock = useSelector((state) => state.settings.keepAwake);
  const wakeLockRef = useRef(null);

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
      if (insomnia) {
        insomnia.keepAwake();
      } else {
        navigator.wakeLock
          .request('screen')
          .then((wakeLockSentinel) => {
            wakeLockRef.current = wakeLockSentinel;
          })
          .catch(() => setKeepAwake(false));
      }
    } else {
      if (insomnia) {
        insomnia.allowSleepAgain();
      } else {
        if (wakeLockRef.current) {
          wakeLockRef.current.release().then(() => {
            wakeLockRef.current = null;
          });
        }
      }
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
  children: PropTypes.node,
};

WakeLockProvider.displayName = displayName;

export default WakeLockProvider;
