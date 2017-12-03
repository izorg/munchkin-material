import React, { Fragment } from 'react';
import Route from 'react-router-dom/es/Route';

import path from './path';
import NewPlayerButton from './NewPlayerButton';
import Screen from './Screen';

const Home = () => (
  <Route path={path}>
    {({ match }) => match && (
      <Fragment>
        <Screen in={match.isExact} />
        <NewPlayerButton in={match.isExact && !match.params.mode} />
      </Fragment>
    )}
  </Route>
);

export default Home;
