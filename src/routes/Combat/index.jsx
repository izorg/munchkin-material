import React from 'react';
import Route from 'react-router-dom/es/Route';

import ScreenLoader from '../../containers/ScreenLoader';

const loader = () => import(/* webpackChunkName: "combat", webpackMode: "lazy" */ './Screen');

const PlayerCombat = () => (
  <Route path="/player/:id/combat">
    {({ match }) => (
      <ScreenLoader
        loader={loader}
        match={match}
      />
    )}
  </Route>
);

export default PlayerCombat;
