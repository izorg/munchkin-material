import "./polyfills";

import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";

import App from "@munchkin/web/src/components/App";
import AugmentedStylesProvider from "@munchkin/web/src/components/AugmentedStylesProvider";
import AugmentedThemeProvider from "@munchkin/web/src/components/AugmentedThemeProvider";
import LocaleProvider from "@munchkin/web/src/components/LocaleProvider";
import ReduxProvider from "@munchkin/web/src/components/ReduxProvider";
import VersionProvider from "@munchkin/web/src/components/VersionProvider";
import WakeLockProvider from "@munchkin/web/src/components/WakeLockProvider";
import "@munchkin/web/src/firebase";
import "@munchkin/web/src/sentry";

import { FullVersionProvider } from "./domains/full-version";
import { WindowsApp } from "./domains/windows-app";

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
      <FullVersionProvider>
        <WakeLockProvider>
          <LocaleProvider>
            <AugmentedStylesProvider>
              <RouterProvider router={router} />
            </AugmentedStylesProvider>
          </LocaleProvider>
        </WakeLockProvider>
      </FullVersionProvider>
    </VersionProvider>
  </ReduxProvider>,
);
