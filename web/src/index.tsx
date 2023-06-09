import "./polyfills";
import "./sentry";

import { StrictMode } from "react";
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
  import("./firebase");
}

const node = document.querySelector("#root");

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
              <LocaleProvider>
                <AugmentedStylesProvider>
                  <AugmentedThemeProvider>
                    <ScreenViewProvider />
                    <App />
                  </AugmentedThemeProvider>
                </AugmentedStylesProvider>
              </LocaleProvider>
            </WakeLockProvider>
          </WorkboxProvider>
        </VersionProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
