import "./polyfills";
import "./sentry";

import { captureException } from "@sentry/react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import AugmentedStylesProvider from "./components/AugmentedStylesProvider";
import AugmentedThemeProvider from "./components/AugmentedThemeProvider";
import LocaleProvider from "./components/LocaleProvider";
import ReduxProvider from "./components/ReduxProvider";
import ScreenViewProvider from "./components/ScreenViewProvider";
import VersionProvider from "./components/VersionProvider";
import WakeLockProvider from "./components/WakeLockProvider";
import WorkboxProvider from "./components/WorkboxProvider";

if (process.env.NODE_ENV === "development") {
  import("./dev");
}

if (process.env.NODE_ENV === "production") {
  import("./firebase").catch((error) => captureException(error));
}

const node = document.getElementById("root");

if (!node) {
  throw new Error("No #root element");
}

const root = createRoot(node);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <VersionProvider>
          <WorkboxProvider>
            <WakeLockProvider>
              <Suspense fallback={null}>
                <LocaleProvider>
                  <AugmentedStylesProvider>
                    <AugmentedThemeProvider>
                      <ScreenViewProvider />
                      <App />
                    </AugmentedThemeProvider>
                  </AugmentedStylesProvider>
                </LocaleProvider>
              </Suspense>
            </WakeLockProvider>
          </WorkboxProvider>
        </VersionProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
