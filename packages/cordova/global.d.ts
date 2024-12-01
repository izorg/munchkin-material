/// <reference types="cordova-plugin-firebase-analytics" />
/// <reference types="cordova-plugin-purchase" />
/// <reference types="cordova-plugin-statusbar" />

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

    Keyboard?: {
      setKeyboardStyle: (color: "dark" | "light") => void;
    };

    plugins?: {
      headerColor?: {
        tint: (color: string) => void;
      };
      insomnia?: {
        allowSleepAgain: () => void;
        keepAwake: () => void;
      };
    };
  }
}

export {};
