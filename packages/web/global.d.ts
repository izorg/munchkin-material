import { type EnhancedStore } from "@reduxjs/toolkit";

declare global {
  namespace Intl {
    interface Locale {
      getTextInfo?: () => {
        direction: "ltr" | "rtl";
      };

      /**
       * See note https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo
       */
      textInfo?: {
        direction: "ltr" | "rtl";
      };
    }
  }

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
