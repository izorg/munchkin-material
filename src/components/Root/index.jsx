import React, { Fragment } from 'react';

import Combat from '../../routes/Combat';
import Home from '../../routes/Home';
import Player from '../../routes/Player';
import PlayerDialog from '../PlayerDialog';

import DiceDialog from '../dice/Dialog';

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
