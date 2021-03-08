import { render } from "react-dom";

import App from "./components/App";
import AugmentedStylesProvider from "./components/AugmentedStylesProvider";
import AugmentedThemeProvider from "./components/AugmentedThemeProvider";
import CordovaProvider from "./components/CordovaProvider";
import CordovaRouter from "./components/CordovaRouter";
import FullVersionProvider from "./components/FullVersionProvider";
import LocaleProvider from "./components/LocaleProvider";
import ReduxProvider from "./components/ReduxProvider";
import SystemPaletteModeProvider from "./components/SystemPaletteModeProvider";
import WakeLockProvider from "./components/WakeLockProvider";

render(
  <CordovaRouter>
    <CordovaProvider>
      <ReduxProvider>
        <FullVersionProvider>
          <WakeLockProvider>
            <LocaleProvider>
              <SystemPaletteModeProvider>
                <AugmentedStylesProvider>
                  <AugmentedThemeProvider>
                    <App />
                  </AugmentedThemeProvider>
                </AugmentedStylesProvider>
              </SystemPaletteModeProvider>
            </LocaleProvider>
          </WakeLockProvider>
        </FullVersionProvider>
      </ReduxProvider>
    </CordovaProvider>
  </CordovaRouter>,
  document.getElementById("root")
);
