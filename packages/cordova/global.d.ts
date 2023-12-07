/// <reference types="cordova-plugin-firebase-analytics" />
/// <reference types="cordova-plugin-purchase" />
/// <reference types="cordova-plugin-statusbar" />

interface Keyboard {
  setKeyboardStyle: (color: "dark" | "light") => void;
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
