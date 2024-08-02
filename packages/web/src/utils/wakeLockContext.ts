import { createContext, useContext } from "react";

type WakeLockContextValue = {
  setWakeLock: (value: boolean) => Promise<void>;
  wakeLock: boolean;
  wakeLockSupport: boolean;
};

export const WakeLockContext = createContext<WakeLockContextValue>({
  setWakeLock: () => {
    throw new Error("No <WakeLockProvider />");
  },
  wakeLock: false,
  wakeLockSupport: false,
});

export const useWakeLock = (): WakeLockContextValue =>
  useContext(WakeLockContext);
