interface Navigator {
  app: {
    exitApp: () => void;
  };
}

interface Window {
  BuildInfo: {
    debug: boolean;
  };

  plugins?: {
    insomnia?: {
      allowSleepAgain: () => void;
      keepAwake: () => void;
    };
  };

  store?: IapStore.IStore;
}
