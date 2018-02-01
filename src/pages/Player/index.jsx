import React from 'react';
import Route from 'react-router-dom/Route';

import ScreenLoader from '../../components/ScreenLoader';

const loader = () => import(/* webpackChunkName: "player" */ './Screen');

const Player = () => (
  <Route path="/player/:id">
    {({ match }) => (
      <ScreenLoader
        loader={loader}
        match={match}
      />
    )}
  </Route>
);

export default Player;
