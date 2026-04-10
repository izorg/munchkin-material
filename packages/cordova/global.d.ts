/// <reference types="node" />
/// <reference types="parcel-env" />
/// <reference types="cordova" />
/// <reference types="cordova-plugin-device" />
/// <reference types="cordova-plugin-statusbar" />

declare global {
  var BuildInfo: Readonly<{
    debug: boolean;
    version: string;
  }>;

  var Keyboard:
    | {
        setKeyboardStyle: (color: "dark" | "light") => void;
      }
    | undefined;

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
