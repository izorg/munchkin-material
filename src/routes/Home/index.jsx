import React from 'react';
import Route from 'react-router-dom/es/Route';

import path from './path';
import Screen from './Screen';

const Home = () => (
  <Route path={path}>
    {({ match }) => match && (<Screen in={match.isExact} />)}
  </Route>
);

export default Home;
