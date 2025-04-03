import "./polyfills";
import "./sentry";
import "./firebase";

import { reactErrorHandler } from "@sentry/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";

import App from "./components/App";
import AugmentedStylesProvider from "./components/AugmentedStylesProvider";
import AugmentedThemeProvider from "./components/AugmentedThemeProvider";
import LocaleProvider from "./components/LocaleProvider";
import ReduxProvider from "./components/ReduxProvider";
import VersionProvider from "./components/VersionProvider";
import WakeLockProvider from "./components/WakeLockProvider";
import WorkboxProvider from "./components/WorkboxProvider";
import { WebApp } from "./domains/web-app";

if (process.env.NODE_ENV === "development") {
  void import("./dev");
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
