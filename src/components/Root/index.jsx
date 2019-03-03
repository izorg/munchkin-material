import React from 'react';
import { Route } from 'react-router-dom';

import * as modes from '../../routes/Home/modes';

import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';
import Screen from '../Screen';

const homeLoader = () => import(/* webpackMode: "eager" */ '../../routes/Home');

const playerLoader = () =>
  import(/* webpackChunkName: "player" */ '../../routes/Player');

const combatLoader = () =>
  import(/* webpackChunkName: "combat" */ '../../routes/Combat');

const Root = () => (
  <>
    <Route path={`/:mode(${Object.values(modes).join('|')})?`}>
      {({ match }) => (
        <Screen appear={false} loader={homeLoader} match={match} />
      )}
    </Route>
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
