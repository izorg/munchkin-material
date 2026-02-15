import "./polyfills";
import "@munchkin/web/src/firebase";
import "@munchkin/web/src/sentry";

import { reactErrorHandler } from "@sentry/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";

import {
  App,
  AugmentedStylesProvider,
  AugmentedThemeProvider,
  LocaleProvider,
  ReduxProvider,
  VersionProvider,
  WakeLockProvider,
  WebApp,
  WorkboxProvider,
} from "@munchkin/web";

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
