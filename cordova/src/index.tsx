import "web-animations-js";

import "../../src/scroll";

import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";

import App from "../../src/components/App";
import AugmentedStylesProvider from "../../src/components/AugmentedStylesProvider";
import AugmentedThemeProvider from "../../src/components/AugmentedThemeProvider";
import LocaleProvider from "../../src/components/LocaleProvider";
import ReduxProvider from "../../src/components/ReduxProvider";
import WakeLockProvider from "../../src/components/WakeLockProvider";

import CordovaProvider from "./components/CordovaProvider";
import FullVersionProvider from "./components/FullVersionProvider";
import SplashScreenProvider from "./components/SplashScreenProvider";
import StatusBarProvider from "./components/StatusBarProvider";

const cordovaScript = document.createElement("script");

cordovaScript.setAttribute("src", "cordova.js");

document.querySelector("head")?.appendChild(cordovaScript);

const root = createRoot(document.getElementById("root") as HTMLElement);

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
