import React from 'react';
import { Route } from 'react-router-dom';

import Combat from '../../routes/Combat';
import Home from '../../routes/Home';
import Player from '../../routes/Player';
import DiceDialog from '../dice/Dialog';
import PlayerDialog from '../PlayerDialog';
import ScreenModal from '../ScreenModal';

const displayName = 'Root';

const Root = () => (
  <>
    <Route path="/">
      {({ match }) => (
        <ScreenModal open={Boolean(match)}>
          <Home />
        </ScreenModal>
      )}
    </Route>
    <Route path="/player/:id">
      {({ match }) => (
        <ScreenModal open={Boolean(match)}>
          <Player />
        </ScreenModal>
      )}
    </Route>
    <Route path="/player/:id/combat">
      {({ match }) => (
        <ScreenModal open={Boolean(match)}>
          <Combat />
        </ScreenModal>
      )}
    </Route>

    <DiceDialog />
    <PlayerDialog />
  </>
);

Root.displayName = displayName;

export default Root;
