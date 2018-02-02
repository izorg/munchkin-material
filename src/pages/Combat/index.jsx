import React from 'react';
import Route from 'react-router-dom/Route';

import ScreenLoader from '../../components/ScreenLoader';

const loader = () => import(/* webpackChunkName: "combat" */ './Screen');

const PlayerCombat = () => (
  <Route path="/player/:id/combat">
    {({ match }) => <ScreenLoader loader={loader} match={match} />}
  </Route>
);

export default PlayerCombat;
