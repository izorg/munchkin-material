import { type EnhancedStore } from "@reduxjs/toolkit";

declare global {
  interface NodeModule {
    hot?: {
      accept(path?: string, callback?: () => void): void;
    };
  }
  interface Window {
    munchkinDev?: {
      setLocale: (locale: string) => void;
      setTestData: () => void;
    };

    reduxStore?: EnhancedStore;
  }
}
