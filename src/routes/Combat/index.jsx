import React from 'react';
import Route from 'react-router-dom/es/Route';

import ScreenLoader from '../../containers/ScreenLoader';

const loader = () => import(/* webpackChunkName: "combat", webpackMode: "lazy" */ './Screen');

const PlayerCombat = () => (
  <Route path="/player/:id/combat">
    {({ match }) => (
      <ScreenLoader
        in={Boolean(match)}
        loader={loader}
        path="/player/:id/combat"
      />
    )}
  </Route>
);

export default PlayerCombat;
