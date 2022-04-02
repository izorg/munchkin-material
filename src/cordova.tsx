import "web-animations-js";

import "./scroll";

import { Suspense } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import AugmentedStylesProvider from "./components/AugmentedStylesProvider";
import AugmentedThemeProvider from "./components/AugmentedThemeProvider";
import CordovaProvider from "./components/CordovaProvider";
import CordovaRouter from "./components/CordovaRouter";
import FullVersionProvider from "./components/FullVersionProvider";
import LocaleProvider from "./components/LocaleProvider";
import ReduxProvider from "./components/ReduxProvider";
import WakeLockProvider from "./components/WakeLockProvider";

const cordovaScript = document.createElement("script");

cordovaScript.setAttribute("src", "cordova.js");

document.querySelector("head")?.appendChild(cordovaScript);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <CordovaRouter>
    <ReduxProvider>
      <Suspense fallback={null}>
        <CordovaProvider>
          <FullVersionProvider>
            <WakeLockProvider>
              <LocaleProvider>
                <AugmentedStylesProvider>
                  <AugmentedThemeProvider>
                    <App />
                  </AugmentedThemeProvider>
                </AugmentedStylesProvider>
              </LocaleProvider>
            </WakeLockProvider>
          </FullVersionProvider>
        </CordovaProvider>
      </Suspense>
    </ReduxProvider>
  </CordovaRouter>
);
