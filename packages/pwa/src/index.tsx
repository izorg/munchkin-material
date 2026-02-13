import "../../web/src/polyfills";
import "../../web/src/sentry";
import "../../web/src/firebase";

import { reactErrorHandler } from "@sentry/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";

import App from "../../web/src/components/App";
import AugmentedStylesProvider from "../../web/src/components/AugmentedStylesProvider";
import AugmentedThemeProvider from "../../web/src/components/AugmentedThemeProvider";
import LocaleProvider from "../../web/src/components/LocaleProvider";
import ReduxProvider from "../../web/src/components/ReduxProvider";
import VersionProvider from "../../web/src/components/VersionProvider";
import WakeLockProvider from "../../web/src/components/WakeLockProvider";
import WorkboxProvider from "../../web/src/components/WorkboxProvider";
import { WebApp } from "../../web/src/domains/web-app";

if (process.env.NODE_ENV === "development") {
  void import("../../web/src/dev");
}

const node = document.querySelector("#root");

if (!node) {
  throw new Error("No #root element");
}

const root = createRoot(node, {
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: reactErrorHandler(),
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: reactErrorHandler((error, errorInfo) => {
    console.warn("Uncaught error", error, errorInfo.componentStack);
  }),
});

root.render(
  <StrictMode>
    <ReduxProvider>
      <VersionProvider>
        <WorkboxProvider>
          <WakeLockProvider>
            <LocaleProvider>
              <AugmentedStylesProvider>
                <HashRouter>
                  <AugmentedThemeProvider>
                    <WebApp />
                    <App />
                  </AugmentedThemeProvider>
                </HashRouter>
              </AugmentedStylesProvider>
            </LocaleProvider>
          </WakeLockProvider>
        </WorkboxProvider>
      </VersionProvider>
    </ReduxProvider>
  </StrictMode>,
);
