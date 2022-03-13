import { lazy, Suspense, useEffect } from "react";

import Home from "../../routes/Home";
import ScreenDialog from "../ScreenDialog";
import UndoProvider from "../UndoProvider";
import UndoSnackbar from "../UndoSnackbar";

const DiceDialog = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "../dice/Dialog"
    )
);

const PlayerDialog = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      "../PlayerDialog"
    )
);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      navigator.splashscreen?.hide();
    }, 10);
  }, []);

  return (
    <UndoProvider>
      <ScreenDialog open TransitionProps={{ appear: false }}>
        <Home />
      </ScreenDialog>

      <Suspense fallback={null}>
        <DiceDialog />
      </Suspense>

      <Suspense fallback={null}>
        <PlayerDialog />
      </Suspense>

      <UndoSnackbar />
    </UndoProvider>
  );
};

export default App;
