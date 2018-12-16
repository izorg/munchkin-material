import React from 'react';
import { Route } from 'react-router-dom';

import * as modes from '../../routes/Home/modes';

import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';
import Screen from '../Screen';

const Root = () => (
  <>
    <Route path={`/:mode(${Object.values(modes).join('|')})?`}>
      {({ match }) => (
        <Screen
          appear={false}
          loader={() => import(/* webpackMode: "eager" */ '../../routes/Home')}
          match={match}
        />
      )}
    </Route>
    <Route path="/player/:id">
      {({ match }) => (
        <Screen
          loader={() =>
            import(/* webpackChunkName: "player" */ '../../routes/Player')
          }
          match={match}
        />
      )}
    </Route>
    <Route path="/player/:id/combat">
      {({ match }) => (
        <Screen
          loader={() =>
            import(/* webpackChunkName: "combat" */ '../../routes/Combat')
          }
          match={match}
        />
      )}
    </Route>

    <DiceDialog />
    <PlayerDialog />
  </>
);

export default Root;
