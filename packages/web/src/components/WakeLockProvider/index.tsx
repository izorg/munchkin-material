import PropTypes from "prop-types";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { setKeepAwake } from "../../ducks/settings";
import usePresentSelector from "../../hooks/usePresentSelector";
import { useAppDispatch } from "../../store";
import { WakeLockContext } from "../../utils/wakeLockContext";

const WakeLockProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const wakeLockSupport = "wakeLock" in navigator;
  const wakeLock = usePresentSelector((state) => state.settings.keepAwake);
  const wakeLockSentinelRef = useRef<WakeLockSentinel>();

  const setWakeLock = useCallback(
    async (value: boolean) => {
      if (!wakeLockSupport) {
        return;
      }

      if (value) {
        wakeLockSentinelRef.current =
          await navigator.wakeLock.request("screen");
      } else {
        if (!wakeLockSentinelRef.current) {
          return;
        }

        await wakeLockSentinelRef.current.release();

        wakeLockSentinelRef.current = undefined;
      }

      dispatch(setKeepAwake(value));
    },
    [dispatch, wakeLockSupport],
  );

  const value = useMemo(
    () => ({ setWakeLock, wakeLock, wakeLockSupport }),
    [setWakeLock, wakeLock, wakeLockSupport],
  );

  return (
    <WakeLockContext.Provider value={value}>
      {children}
    </WakeLockContext.Provider>
  );
};

WakeLockProvider.propTypes = {
  children: PropTypes.node,
};

export default WakeLockProvider;
