import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import * as modes from '../../routes/Home/modes';

import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';
import ScreenLoader from '../ScreenLoader';

const Root = () => (
  <Fragment>
    <Route path={`/:mode(${Object.values(modes).join('|')})?`}>
      {({ match }) => (
        <ScreenLoader
          loader={() => import(/* webpackMode: "eager" */ '../../routes/Home')}
          match={match}
        />
      )}
    </Route>
    <Route path="/player/:id">
      {({ match }) => (
        <ScreenLoader
          loader={() =>
            import(/* webpackChunkName: "player", webpackPrefetch: true */ '../../routes/Player')
          }
          match={match}
        />
      )}
    </Route>
    <Route path="/player/:id/combat">
      {({ match }) => (
        <ScreenLoader
          loader={() =>
            import(/* webpackChunkName: "combat", webpackPrefetch: true */ '../../routes/Combat')
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
