/// <reference types="cordova" />

declare global {
  var BuildInfo: {
    debug: boolean;
    version: string;
  };

  var plugins:
    | {
        headerColor?: {
          tint: (color: string) => void;
        };
        insomnia?: {
          allowSleepAgain: () => void;
          keepAwake: () => void;
        };
      }
    | undefined;

  interface BarProp {
    setBackgroundColor: (color: string) => void;
  }

  interface Navigator {
    app: {
      exitApp: () => void;
    };
  }
}

export {};
