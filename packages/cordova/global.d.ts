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
