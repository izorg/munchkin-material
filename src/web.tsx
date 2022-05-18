import "./sentry";

import { captureException } from "@sentry/react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import AugmentedStylesProvider from "./components/AugmentedStylesProvider";
import AugmentedThemeProvider from "./components/AugmentedThemeProvider";
import LocaleProvider from "./components/LocaleProvider";
import ReduxProvider from "./components/ReduxProvider";
import WakeLockProvider from "./components/WakeLockProvider";
import WorkboxProvider from "./components/WorkboxProvider";

import("./firebase").catch((error) => captureException(error));

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <WorkboxProvider>
          <WakeLockProvider>
            <Suspense fallback={null}>
              <LocaleProvider>
                <AugmentedStylesProvider>
                  <AugmentedThemeProvider>
                    <App />
                  </AugmentedThemeProvider>
                </AugmentedStylesProvider>
              </LocaleProvider>
            </Suspense>
          </WakeLockProvider>
        </WorkboxProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
