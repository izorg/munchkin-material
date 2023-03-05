import "./polyfills";

import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

import App from "@munchkin/web/src/components/App";
import AugmentedStylesProvider from "@munchkin/web/src/components/AugmentedStylesProvider";
import AugmentedThemeProvider from "@munchkin/web/src/components/AugmentedThemeProvider";
import LocaleProvider from "@munchkin/web/src/components/LocaleProvider";
import ReduxProvider from "@munchkin/web/src/components/ReduxProvider";

import CordovaProvider from "./components/CordovaProvider";
import FullVersionProvider from "./components/FullVersionProvider";
import KeyboardProvider from "./components/KeyboardProvider";
import ScreenViewProvider from "./components/ScreenViewProvider";
import SplashScreenProvider from "./components/SplashScreenProvider";
import StatusBarProvider from "./components/StatusBarProvider";
import WakeLockProvider from "./components/WakeLockProvider";

const cordovaScript = document.createElement("script");

cordovaScript.setAttribute("src", "cordova.js");

document.querySelector("head")?.appendChild(cordovaScript);

const node = document.getElementById("root");

if (!node) {
  throw new Error("No #root element");
}

const root = createRoot(node);

document.addEventListener(
  "deviceready",
  () => {
    if (!window.BuildInfo.debug) {
      import("@munchkin/web/src/sentry").catch(() => {
        // ignore sentry init error
      });
    }

    root.render(
      <MemoryRouter>
        <ReduxProvider>
          <Suspense fallback={null}>
            <CordovaProvider>
              <FullVersionProvider>
                <WakeLockProvider>
                  <LocaleProvider>
                    <AugmentedStylesProvider>
                      <AugmentedThemeProvider>
                        <SplashScreenProvider />
                        <StatusBarProvider />
                        <KeyboardProvider />
                        <ScreenViewProvider />
                        <App />
                      </AugmentedThemeProvider>
                    </AugmentedStylesProvider>
                  </LocaleProvider>
                </WakeLockProvider>
              </FullVersionProvider>
            </CordovaProvider>
          </Suspense>
        </ReduxProvider>
      </MemoryRouter>
    );
  },
  false
);
