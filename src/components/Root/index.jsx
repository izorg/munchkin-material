import React, { lazy } from 'react';

import * as modes from '../../routes/Home/modes';

import DialogRoute from '../DialogRoute';
import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';

const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ '../../routes/Home'),
);

const Player = lazy(() =>
  import(/* webpackChunkName: "player" */ '../../routes/Player'),
);

const Combat = lazy(() =>
  import(/* webpackChunkName: "combat" */ '../../routes/Combat'),
);

const Root = () => (
  <>
    <DialogRoute
      component={Home}
      path={`/:mode(${Object.values(modes).join('|')})?`}
    />
    <DialogRoute component={Player} path="/player/:id" />
    <DialogRoute component={Combat} path="/player/:id/combat" />

    <DiceDialog />
    <PlayerDialog />
  </>
);

Root.displayName = 'Root';

export default Root;
