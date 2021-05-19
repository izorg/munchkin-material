import { EnhancedStore } from "@reduxjs/toolkit";

declare global {
  interface Window {
    BuildInfo: {
      debug: boolean;
    };
    Keyboard?: {
      setKeyboardStyle: (color: string) => void;
    };
    plugins?: {
      insomnia?: {
        keepAwake: () => void;
        allowSleepAgain: () => void;
      };
    };
    reduxStore: EnhancedStore;
    StatusBar?: StatusBar;
    store?: IapStore.IStore;
  }

  interface Navigator {
    app: {
      exitApp: () => void;
    };
  }
}
