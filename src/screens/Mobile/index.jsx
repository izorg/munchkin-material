import React, { Fragment } from 'react';

import Combat from './Combat';
import Home from './Home';
import Player from './Player';
import PlayerForm from './PlayerForm';

const Mobile = () => (
  <Fragment>
    <Home />
    <PlayerForm />
    <Player />
    <Combat />
  </Fragment>
);

export default Mobile;
