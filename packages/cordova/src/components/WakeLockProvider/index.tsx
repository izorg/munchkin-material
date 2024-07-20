import PropTypes from "prop-types";
import {
  type FC,
  type PropsWithChildren,
  useCallback,
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
    async (value: boolean) => {
      if (!wakeLockSupport) {
        return;
      }

      if (value) {
        if (insomnia) {
          insomnia.keepAwake();
        } else {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        }
      } else if (insomnia) {
        insomnia.allowSleepAgain();
      } else {
        if (!wakeLockRef.current) {
          return;
        }

        await wakeLockRef.current.release();

        wakeLockRef.current = undefined;
      }

      dispatch(setKeepAwake(value));
    },
    [dispatch, insomnia, wakeLockSupport],
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
