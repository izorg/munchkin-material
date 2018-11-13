import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Home from '../../routes/Home';
import { path } from '../../routes/Home/selectors';

import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';
import ScreenLoader from '../ScreenLoader';

const Root = () => (
  <Fragment>
    <Route path={path}>{({ match }) => <Home match={match} />}</Route>
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
