import React from 'react';

import Combat from '../../routes/Combat';
import Home from '../../routes/Home';
import * as modes from '../../routes/Home/modes';
import Player from '../../routes/Player';

import DialogRoute from '../DialogRoute';
import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';

const Root = () => (
  <>
    <DialogRoute
      component={Home}
      path={`/:mode(${Object.values(modes).join('|')})?`}
    />
    <DialogRoute component={Player} path="/player/:id" />
    <DialogRoute component={Combat} path="/player/:id/combat" />

    <DiceDialog />
    <PlayerDialog />
  </>
);

Root.displayName = 'Root';

export default Root;
