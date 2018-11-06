import React, { Fragment } from 'react';

import Combat from '../../routes/Combat';
import Home from '../../routes/Home';
import Player from '../../routes/Player';

import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';

const Root = () => (
  <Fragment>
    <Home />
    <Player />
    <Combat />

    <DiceDialog />
    <PlayerDialog />
  </Fragment>
);

export default Root;
