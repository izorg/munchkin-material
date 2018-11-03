import React, { Fragment } from 'react';

import Combat from '../../routes/Combat';
import Home from '../../routes/Home';
import Player from '../../routes/Player';
import PlayerForm from '../PlayerForm';

import DiceDialog from '../dice/Dialog';

const Root = () => (
  <Fragment>
    <Home />
    <PlayerForm />
    <Player />
    <Combat />

    <DiceDialog />
  </Fragment>
);

export default Root;
