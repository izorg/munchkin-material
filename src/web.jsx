import "./sentry";

import { captureException } from "@sentry/react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import AugmentedStylesProvider from "./components/AugmentedStylesProvider";
import AugmentedThemeProvider from "./components/AugmentedThemeProvider";
import LocaleProvider from "./components/LocaleProvider";
import ReduxProvider from "./components/ReduxProvider";
import WakeLockProvider from "./components/WakeLockProvider";
import WorkboxProvider from "./components/WorkboxProvider";

import("./firebase").catch((error) => captureException(error));

render(
  <BrowserRouter>
    <ReduxProvider>
      <WorkboxProvider>
        <WakeLockProvider>
          <LocaleProvider>
            <AugmentedStylesProvider>
              <AugmentedThemeProvider>
                <App />
              </AugmentedThemeProvider>
            </AugmentedStylesProvider>
          </LocaleProvider>
        </WakeLockProvider>
      </WorkboxProvider>
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
