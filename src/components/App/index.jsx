import React, { lazy, Suspense, useEffect } from 'react';

import Home from '../../routes/Home';
import ScreenModal from '../ScreenModal';
import UndoProvider from '../UndoProvider';
import UndoSnackbar from '../UndoSnackbar';

const DiceDialog = lazy(() =>
  import(
    /* webpackChunkName: "dice" */
    /* webpackPrefetch: true */
    '../dice/Dialog'
  ),
);

const PlayerDialog = lazy(() =>
  import(
    /* webpackChunkName: "player-dialog" */
    /* webpackPrefetch: true */
    '../PlayerDialog'
  ),
);

const displayName = 'App';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      navigator.splashscreen?.hide();
    }, 10);
  }, []);

  return (
    <UndoProvider>
      <ScreenModal open TransitionProps={{ appear: false }}>
        <Home />
      </ScreenModal>

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

App.displayName = displayName;

export default App;
