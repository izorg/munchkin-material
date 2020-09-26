import React, { lazy, Suspense } from 'react';

import Home from '../../routes/Home';
import AugmentedStylesProvider from '../AugmentedStylesProvider';
import AugmentedThemeProvider from '../AugmentedThemeProvider';
import LocaleProvider from '../LocaleProvider';
import ScreenModal from '../ScreenModal';
import SystemPaletteTypeProvider from '../SystemPaletteTypeProvider';
import UndoProvider from '../UndoProvider';
import UndoSnackbar from '../UndoSnackbar';
import WakeLockProvider from '../WakeLockProvider';

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

const App = () => (
  <WakeLockProvider>
    <LocaleProvider>
      <SystemPaletteTypeProvider>
        <AugmentedStylesProvider>
          <AugmentedThemeProvider>
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
          </AugmentedThemeProvider>
        </AugmentedStylesProvider>
      </SystemPaletteTypeProvider>
    </LocaleProvider>
  </WakeLockProvider>
);

App.displayName = displayName;

export default App;
