import React from 'react';
import Route from 'react-router-dom/es/Route';

import ScreenLoader from '../../containers/ScreenLoader';

const loader = () => import(/* webpackChunkName: "player", webpackMode: "lazy" */ './Screen');

const Player = () => (
  <Route path="/player/:id">
    {({ match }) => (
      <ScreenLoader
        in={Boolean(match)}
        loader={loader}
        path="/player/:id"
      />
    )}
  </Route>
);

export default Player;
