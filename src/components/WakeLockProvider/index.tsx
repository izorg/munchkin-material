import PropTypes from "prop-types";
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

import { setKeepAwake } from "../../ducks/settings";
import { useAppDispatch } from "../../store";
import usePresentSelector from "../../utils/usePresentSelector";

type WakeLockContext = {
  setWakeLock: (value: boolean) => void;
  wakeLock: boolean;
  wakeLockSupport: boolean;
};

const Context = createContext<WakeLockContext>({
  setWakeLock: () => {
    throw new Error("No <WakeLockProvider />");
  },
  wakeLock: false,
  wakeLockSupport: false,
});

export const useWakeLock = (): WakeLockContext => useContext(Context);

const WakeLockProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const dispatch = useAppDispatch();

  const insomnia = window.plugins?.insomnia;
  const wakeLockSupport = !!insomnia || "wakeLock" in navigator;
  const wakeLock = usePresentSelector((state) => state.settings.keepAwake);
  const wakeLockRef = useRef<WakeLockSentinel | undefined>(undefined);

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
    <Context.Provider value={{ setWakeLock, wakeLock, wakeLockSupport }}>
      {children}
    </Context.Provider>
  );
};

WakeLockProvider.propTypes = {
  children: PropTypes.node,
};

export default WakeLockProvider;
