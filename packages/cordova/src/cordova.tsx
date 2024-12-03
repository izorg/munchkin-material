import "./sentry";

import { createRoot } from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router";

import App from "../../web/src/components/App";
import AugmentedStylesProvider from "../../web/src/components/AugmentedStylesProvider";
import AugmentedThemeProvider from "../../web/src/components/AugmentedThemeProvider";
import LocaleProvider from "../../web/src/components/LocaleProvider";
import ReduxProvider from "../../web/src/components/ReduxProvider";

import AppStoreLinkProvider from "./components/AppStoreLinkProvider";
import CordovaProvider from "./components/CordovaProvider";
import FullVersionProvider from "./components/FullVersionProvider";
import HeaderColorProvider from "./components/HeaderColorProvider";
import KeyboardProvider from "./components/KeyboardProvider";
import ScreenViewProvider from "./components/ScreenViewProvider";
import SplashScreenProvider from "./components/SplashScreenProvider";
import StatusBarProvider from "./components/StatusBarProvider";
import VersionProvider from "./components/VersionProvider";
import WakeLockProvider from "./components/WakeLockProvider";

const node = document.querySelector("#root");

if (!node) {
  throw new Error("No #root element");
}

const root = createRoot(node);

const router = createMemoryRouter([
  {
    element: (
      <AugmentedThemeProvider>
        <CordovaProvider />
        <SplashScreenProvider />
        <StatusBarProvider />
        <HeaderColorProvider />
        <KeyboardProvider />
        <ScreenViewProvider />
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
          <AppStoreLinkProvider>
            <LocaleProvider>
              <AugmentedStylesProvider>
                <RouterProvider router={router} />
              </AugmentedStylesProvider>
            </LocaleProvider>
          </AppStoreLinkProvider>
        </WakeLockProvider>
      </FullVersionProvider>
    </VersionProvider>
  </ReduxProvider>,
);
