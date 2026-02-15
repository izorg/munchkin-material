import "./sentry";

import { reactErrorHandler } from "@sentry/react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router";

import ReduxProvider from "@munchkin/web/src/components/ReduxProvider";

import App from "../../web/src/components/App";
import AugmentedStylesProvider from "../../web/src/components/AugmentedStylesProvider";
import AugmentedThemeProvider from "../../web/src/components/AugmentedThemeProvider";
import LocaleProvider from "../../web/src/components/LocaleProvider";

import AppStoreLinkProvider from "./components/AppStoreLinkProvider";
import { FullVersionProvider } from "./components/FullVersionProvider";
import VersionProvider from "./components/VersionProvider";
import WakeLockProvider from "./components/WakeLockProvider";
import { CordovaApp } from "./domains/cordova-app";

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
  <ReduxProvider>
    <VersionProvider>
      <FullVersionProvider>
        <WakeLockProvider>
          <AppStoreLinkProvider>
            <LocaleProvider>
              <AugmentedStylesProvider>
                <MemoryRouter>
                  <AugmentedThemeProvider>
                    <CordovaApp />
                    <App />
                  </AugmentedThemeProvider>
                </MemoryRouter>
              </AugmentedStylesProvider>
            </LocaleProvider>
          </AppStoreLinkProvider>
        </WakeLockProvider>
      </FullVersionProvider>
    </VersionProvider>
  </ReduxProvider>,
);
