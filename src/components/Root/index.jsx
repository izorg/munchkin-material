import React, { lazy, Suspense } from 'react';

import * as modes from '../../routes/Home/modes';

import DialogRoute from '../DialogRoute';

const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ '../../routes/Home'),
);

const Player = lazy(() =>
  import(
    /* webpackChunkName: "player", webpackPrefetch: true */ '../../routes/Player'
  ),
);

const Combat = lazy(() =>
  import(
    /* webpackChunkName: "combat", webpackPrefetch: true */ '../../routes/Combat'
  ),
);

const DiceDialog = lazy(() =>
  import(/* webpackChunkName: "dice-dialog" */ '../dice/Dialog'),
);

const PlayerDialog = lazy(() =>
  import(/* webpackChunkName: "player-dialog" */ '../PlayerDialog'),
);

const Root = () => (
  <>
    <DialogRoute
      component={Home}
      path={`/:mode(${Object.values(modes).join('|')})?`}
    />
    <DialogRoute component={Player} path="/player/:id" />
    <DialogRoute component={Combat} path="/player/:id/combat" />

    <Suspense fallback={null}>
      <DiceDialog />
    </Suspense>

    <Suspense fallback={null}>
      <PlayerDialog />
    </Suspense>
  </>
);

Root.displayName = 'Root';

export default Root;
