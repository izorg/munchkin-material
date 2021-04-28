import { EnhancedStore } from "@reduxjs/toolkit";

declare global {
  interface Window {
    BuildInfo: {
      debug: boolean;
    };
    reduxStore: EnhancedStore;
  }

  interface Navigator {
    app: {
      exitApp: () => void;
    };
  }
}
