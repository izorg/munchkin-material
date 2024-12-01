import "./polyfills";
import "./sentry";
import "./firebase";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";

import App from "./components/App";
import AugmentedStylesProvider from "./components/AugmentedStylesProvider";
import AugmentedThemeProvider from "./components/AugmentedThemeProvider";
import LocaleProvider from "./components/LocaleProvider";
import ReduxProvider from "./components/ReduxProvider";
import ThemeColorProvider from "./components/ThemeColorProvider";
import VersionProvider from "./components/VersionProvider";
import WakeLockProvider from "./components/WakeLockProvider";
import WorkboxProvider from "./components/WorkboxProvider";

if (process.env.NODE_ENV === "development") {
  void import("./dev");
}

const node = document.querySelector("#root");

if (!node) {
  throw new Error("No #root element");
}

const root = createRoot(node);

const router = createHashRouter([
  {
    element: (
      <AugmentedStylesProvider>
        <AugmentedThemeProvider>
          <ThemeColorProvider />
          <App />
        </AugmentedThemeProvider>
      </AugmentedStylesProvider>
    ),
    path: "*",
  },
]);

root.render(
  <StrictMode>
    <ReduxProvider>
      <VersionProvider>
        <WorkboxProvider>
          <WakeLockProvider>
            <LocaleProvider>
              <RouterProvider router={router} />
            </LocaleProvider>
          </WakeLockProvider>
        </WorkboxProvider>
      </VersionProvider>
    </ReduxProvider>
  </StrictMode>,
);
