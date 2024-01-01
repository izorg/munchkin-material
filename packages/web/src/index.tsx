import "./polyfills";
import "./sentry";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "./components/App";
import AugmentedStylesProvider from "./components/AugmentedStylesProvider";
import AugmentedThemeProvider from "./components/AugmentedThemeProvider";
import LocaleProvider from "./components/LocaleProvider";
import ReduxProvider from "./components/ReduxProvider";
import ScreenViewProvider from "./components/ScreenViewProvider";
import ThemeColorProvider from "./components/ThemeColorProvider";
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

const router = createHashRouter([
  {
    element: (
      <ReduxProvider>
        <VersionProvider>
          <WorkboxProvider>
            <WakeLockProvider>
              <LocaleProvider>
                <AugmentedStylesProvider>
                  <AugmentedThemeProvider>
                    <ScreenViewProvider />
                    <ThemeColorProvider />
                    <App />
                  </AugmentedThemeProvider>
                </AugmentedStylesProvider>
              </LocaleProvider>
            </WakeLockProvider>
          </WorkboxProvider>
        </VersionProvider>
      </ReduxProvider>
    ),
    path: "*",
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
