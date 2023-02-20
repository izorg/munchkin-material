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
