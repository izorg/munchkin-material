import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Home from '../../routes/Home';

import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';
import ScreenLoader from '../ScreenLoader';

const Root = () => (
  <Fragment>
    <Home />
    <Route path="/player/:id">
      {({ match }) => (
        <ScreenLoader
          loader={() =>
            import(/* webpackChunkName: "player" */ '../../routes/Player')
          }
          match={match}
        />
      )}
    </Route>
    <Route path="/player/:id/combat">
      {({ match }) => (
        <ScreenLoader
          loader={() =>
            import(/* webpackChunkName: "combat" */ '../../routes/Combat')
          }
          match={match}
        />
      )}
    </Route>

    <DiceDialog />
    <PlayerDialog />
  </Fragment>
);

export default Root;
