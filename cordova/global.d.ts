/// <reference types="cordova-plugin-purchase" />
/// <reference types="cordova-plugin-statusbar" />

interface Keyboard {
  setKeyboardStyle: (color: string) => void;
}

declare global {
  interface Navigator {
    app: {
      exitApp: () => void;
    };
  }

  interface Window {
    BuildInfo: {
      debug: boolean;
    };

    Keyboard?: Keyboard;

    plugins?: {
      insomnia?: {
        allowSleepAgain: () => void;
        keepAwake: () => void;
      };
    };

    StatusBar?: StatusBar;

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

export {};
