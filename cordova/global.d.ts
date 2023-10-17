/// <reference types="cordova-plugin-firebase-analytics" />
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
      version: string;
    };

    Keyboard?: Keyboard;

    plugins?: {
      insomnia?: {
        allowSleepAgain: () => void;
        keepAwake: () => void;
      };
    };

    StatusBar?: StatusBar;
  }
}

export {};
