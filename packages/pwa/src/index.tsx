import "./polyfills";

import { reactErrorHandler } from "@sentry/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";

import App from "@munchkin/web/src/components/App";
import AugmentedStylesProvider from "@munchkin/web/src/components/AugmentedStylesProvider";
import AugmentedThemeProvider from "@munchkin/web/src/components/AugmentedThemeProvider";
import LocaleProvider from "@munchkin/web/src/components/LocaleProvider";
import ReduxProvider from "@munchkin/web/src/components/ReduxProvider";
import VersionProvider from "@munchkin/web/src/components/VersionProvider";
import WakeLockProvider from "@munchkin/web/src/components/WakeLockProvider";
import WorkboxProvider from "@munchkin/web/src/components/WorkboxProvider";
import { WebApp } from "@munchkin/web/src/domains/web-app";
import "@munchkin/web/src/firebase";
import "@munchkin/web/src/sentry";

if (process.env.NODE_ENV === "development") {
  void import("@munchkin/web/src/dev");
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
