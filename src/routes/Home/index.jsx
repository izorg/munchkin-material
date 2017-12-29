import React from 'react';
import Route from 'react-router-dom/es/Route';

import path from './path';
import Screen from './Screen';

const Home = () => (
  <Route path={path}>
    {({ match }) => (
      <Screen
        match={match}
      />
    )}
  </Route>
);

export default Home;
