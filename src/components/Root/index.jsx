import React, { Fragment } from 'react';
import Loadable from 'react-loadable';
import { Route } from 'react-router-dom';

import * as modes from '../../routes/Home/modes';

import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';
import Screen from '../Screen';

import loading from '../Screen/Loading';

const Home = Loadable({
  loader: () => import(/* webpackMode: "eager" */ '../../routes/Home'),
  loading,
});

const Player = Loadable({
  loader: () =>
    import(/* webpackChunkName: "player", webpackPrefetch: true */ '../../routes/Player'),
  loading,
});

const Combat = Loadable({
  loader: () =>
    import(/* webpackChunkName: "combat", webpackPrefetch: true */ '../../routes/Combat'),
  loading,
});

const Root = () => (
  <Fragment>
    <Route path={`/:mode(${Object.values(modes).join('|')})?`}>
      {({ match }) => {
        if (match) {
          Player.preload();
        }

        return <Screen appear={false} component={Home} match={match} />;
      }}
    </Route>
    <Route path="/player/:id">
      {({ match }) => {
        if (match) {
          Combat.preload();
        }

        return <Screen component={Player} match={match} />;
      }}
    </Route>
    <Route path="/player/:id/combat">
      {({ match }) => <Screen component={Combat} match={match} />}
    </Route>

    <DiceDialog />
    <PlayerDialog />
  </Fragment>
);

export default Root;
