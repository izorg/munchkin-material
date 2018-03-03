import React, { Fragment } from 'react';

import Head from '../Head';
import Combat from '../../routes/Combat';
import Home from '../../routes/Home';
import Player from '../../routes/Player';
import PlayerForm from '../../routes/PlayerForm';

import DiceDialog from '../dice/Dialog';

const Root = () => (
  <Fragment>
    <Head />

    <Home />
    <PlayerForm />
    <Player />
    <Combat />

    <DiceDialog />
  </Fragment>
);

export default Root;
