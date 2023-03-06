import PropTypes from "prop-types";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { setKeepAwake } from "@munchkin/web/src/ducks/settings";
import usePresentSelector from "@munchkin/web/src/hooks/usePresentSelector";
import { useAppDispatch } from "@munchkin/web/src/store";
import { WakeLockContext } from "@munchkin/web/src/utils/wakeLockContext";

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
    [dispatch, wakeLockSupport]
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
      } else {
        if (wakeLockRef.current) {
          void wakeLockRef.current.release().then(() => {
            wakeLockRef.current = undefined;
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

export default WakeLockProvider;
