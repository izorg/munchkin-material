import "../../web/src/polyfills";
import "../../web/src/sentry";
import "../../web/src/firebase";

import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";

import App from "../../web/src/components/App";
import AugmentedStylesProvider from "../../web/src/components/AugmentedStylesProvider";
import AugmentedThemeProvider from "../../web/src/components/AugmentedThemeProvider";
import LocaleProvider from "../../web/src/components/LocaleProvider";
import ReduxProvider from "../../web/src/components/ReduxProvider";
import VersionProvider from "../../web/src/components/VersionProvider";
import WakeLockProvider from "../../web/src/components/WakeLockProvider";

import { WindowsApp } from "./domains/WindowsApp";

const node = document.querySelector("#root");

if (!node) {
  throw new Error("No #root element");
}

const root = createRoot(node);

const router = createHashRouter([
  {
    element: (
      <AugmentedThemeProvider>
        <WindowsApp />
        <App />
      </AugmentedThemeProvider>
    ),
    path: "*",
  },
]);

root.render(
  <ReduxProvider>
    <VersionProvider>
      <WakeLockProvider>
        <LocaleProvider>
          <AugmentedStylesProvider>
            <RouterProvider router={router} />
          </AugmentedStylesProvider>
        </LocaleProvider>
      </WakeLockProvider>
    </VersionProvider>
  </ReduxProvider>,
);
