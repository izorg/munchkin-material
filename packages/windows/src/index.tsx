import "./polyfills";
import "@munchkin/web/src/firebase";
import "@munchkin/web/src/sentry";

import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";

import {
  App,
  AugmentedStylesProvider,
  AugmentedThemeProvider,
  LocaleProvider,
  ReduxProvider,
  VersionProvider,
  WakeLockProvider,
} from "@munchkin/web";

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
