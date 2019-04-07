import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../../routes/Home';
import * as modes from '../../routes/Home/modes';

import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';
import Screen from '../Screen';

const playerLoader = () =>
  import(/* webpackChunkName: "player" */ '../../routes/Player');

const combatLoader = () =>
  import(/* webpackChunkName: "combat" */ '../../routes/Combat');

const Root = () => (
  <>
    <Route
      component={Home}
      path={`/:mode(${Object.values(modes).join('|')})?`}
    />
    <Route path="/player/:id">
      {({ match }) => <Screen loader={playerLoader} match={match} />}
    </Route>
    <Route path="/player/:id/combat">
      {({ match }) => <Screen loader={combatLoader} match={match} />}
    </Route>

    <DiceDialog />
    <PlayerDialog />
  </>
);

export default Root;
