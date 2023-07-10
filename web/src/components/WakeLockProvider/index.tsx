import PropTypes from "prop-types";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
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
  const wakeLockRef = useRef<undefined | WakeLockSentinel>(undefined);

  const setWakeLock = useCallback(
    (value: boolean) => {
      if (!wakeLockSupport) {
        throw new Error("Calling setWakeLock() without wakeLockSupport");
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
      navigator.wakeLock
        .request("screen")
        .then((wakeLockSentinel) => {
          wakeLockRef.current = wakeLockSentinel;
        })
        .catch(() => setKeepAwake(false));
    } else {
      if (wakeLockRef.current) {
        void wakeLockRef.current.release().then(() => {
          wakeLockRef.current = undefined;
        });
      }
    }
  }, [wakeLock, wakeLockSupport]);

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

export default WakeLockProvider;
