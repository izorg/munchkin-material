import "cordova-plugin-purchase"; // eslint-disable-line import/no-unresolved
import "cordova-plugin-statusbar"; // eslint-disable-line import/no-unresolved

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
