import React from 'react';
import Route from 'react-router-dom/es/Route';

import Screen from './Screen';

const TabletHome = () => (
  <Route path="/">
    {({ match }) => (
      <Screen
        match={match}
      />
    )}
  </Route>
);

export default TabletHome;
