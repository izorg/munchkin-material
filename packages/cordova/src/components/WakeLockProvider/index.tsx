import PropTypes from "prop-types";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { setKeepAwake } from "../../../../web/src/ducks/settings";
import usePresentSelector from "../../../../web/src/hooks/usePresentSelector";
import { useAppDispatch } from "../../../../web/src/store";
import { WakeLockContext } from "../../../../web/src/utils/wakeLockContext";

const WakeLockProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const insomnia = window.plugins?.insomnia;
  const wakeLockSupport = Boolean(insomnia) || "wakeLock" in navigator;
  const wakeLock = usePresentSelector((state) => state.settings.keepAwake);
  const wakeLockRef = useRef<WakeLockSentinel>();

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
      if (insomnia) {
        insomnia.keepAwake();
      } else {
        navigator.wakeLock
          .request("screen")
          .then((wakeLockSentinel) => {
            wakeLockRef.current = wakeLockSentinel;
          })
          .catch(() => setKeepAwake(false));
      }
    } else {
      if (insomnia) {
        insomnia.allowSleepAgain();
      } else if (wakeLockRef.current) {
        void wakeLockRef.current.release().then(() => {
          wakeLockRef.current = undefined;
        });
      }
    }
  }, [insomnia, wakeLock, wakeLockSupport]);

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
