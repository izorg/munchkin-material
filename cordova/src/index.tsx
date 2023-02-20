import "web-animations-js"; // eslint-disable-line

import "./scroll.js";

import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

import App from "../../src/components/App";
import AugmentedStylesProvider from "../../src/components/AugmentedStylesProvider";
import AugmentedThemeProvider from "../../src/components/AugmentedThemeProvider";
import LocaleProvider from "../../src/components/LocaleProvider";
import ReduxProvider from "../../src/components/ReduxProvider";

import CordovaProvider from "./components/CordovaProvider";
import FullVersionProvider from "./components/FullVersionProvider";
import KeyboardProvider from "./components/KeyboardProvider";
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
      import("../../src/sentry").catch(() => {
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
