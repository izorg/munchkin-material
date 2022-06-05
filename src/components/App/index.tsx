import { domMax, LazyMotion } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";

import Home from "../Home";
import ScreenDialog from "../ScreenDialog";
import UndoProvider from "../UndoProvider";
import UndoSnackbar from "../UndoSnackbar";

const DiceDialog = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "../DiceDialog"
    )
);

const PlayerDialog = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "../PlayerDialog"
    )
);

const SettingsDialog = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "../SettingsDialog"
    )
);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      navigator.splashscreen?.hide();
    }, 10);
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      <UndoProvider>
        <ScreenDialog open TransitionProps={{ appear: false }}>
          <Home />
        </ScreenDialog>

        <Suspense fallback={null}>
          <SettingsDialog />
        </Suspense>

        <Suspense fallback={null}>
          <DiceDialog />
        </Suspense>

        <Suspense fallback={null}>
          <PlayerDialog />
        </Suspense>

        <UndoSnackbar />
      </UndoProvider>
    </LazyMotion>
  );
};

export default App;
