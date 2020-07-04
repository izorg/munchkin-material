import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import Home from '../../routes/Home';
import ScreenModal from '../ScreenModal';

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
  <>
    <Route path="/">
      {() => (
        <ScreenModal open TransitionProps={{ appear: false }}>
          <Home />
        </ScreenModal>
      )}
    </Route>

    <Suspense fallback={null}>
      <DiceDialog />
    </Suspense>

    <Suspense fallback={null}>
      <PlayerDialog />
    </Suspense>
  </>
);

App.displayName = displayName;

export default App;
