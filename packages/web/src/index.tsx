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
  void import("./dev");
}

if (process.env.NODE_ENV === "production") {
  void import("./firebase");
}

const node = document.querySelector("#root");

if (!node) {
  throw new Error("No #root element");
}

const root = createRoot(node);

const router = createHashRouter(
  [
    {
      element: (
        <AugmentedStylesProvider>
          <AugmentedThemeProvider>
            <ScreenViewProvider />
            <ThemeColorProvider />
            <App />
          </AugmentedThemeProvider>
        </AugmentedStylesProvider>
      ),
      path: "*",
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

root.render(
  <StrictMode>
    <ReduxProvider>
      <VersionProvider>
        <WorkboxProvider>
          <WakeLockProvider>
            <LocaleProvider>
              <RouterProvider
                future={{
                  v7_startTransition: true,
                }}
                router={router}
              />
            </LocaleProvider>
          </WakeLockProvider>
        </WorkboxProvider>
      </VersionProvider>
    </ReduxProvider>
  </StrictMode>,
);
