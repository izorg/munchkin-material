import React from 'react';

import Combat from '../../routes/Combat';
import Home from '../../routes/Home';
import Player from '../../routes/Player';
import DialogRoute from '../DialogRoute';
import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';

const displayName = 'Root';

const Root = () => (
  <>
    <DialogRoute path="/">
      <Home />
    </DialogRoute>
    <DialogRoute path="/player/:id">
      <Player />
    </DialogRoute>
    <DialogRoute path="/player/:id/combat">
      <Combat />
    </DialogRoute>

    <DiceDialog />
    <PlayerDialog />
  </>
);

Root.displayName = displayName;

export default Root;
