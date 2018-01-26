import React from 'react';
import Route from 'react-router-dom/es/Route';

import ScreenLoader from '../../components/ScreenLoader';

const loader = () => import(/* webpackChunkName: "player", webpackMode: "lazy" */ './Screen');

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
