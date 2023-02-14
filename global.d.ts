import { type EnhancedStore } from "@reduxjs/toolkit";

declare global {
  interface Window {
    Keyboard?: {
      setKeyboardStyle: (color: string) => void;
    };
    munchkinDev?: {
      setLocale: (locale: string) => void;
      setTestData: () => void;
    };
    plugins?: {
      insomnia?: {
        keepAwake: () => void;
        allowSleepAgain: () => void;
      };
    };
    reduxStore?: EnhancedStore;
    store?: IapStore.IStore;
    Windows: {
      UI: {
        Core: {
          AppViewBackButtonVisibility: {
            collapsed: boolean;
          };
          SystemNavigationManager: {
            getForCurrentView: () => {
              appViewBackButtonVisibility: boolean;
            };
          };
        };
      };
    };
  }
}
