import React, { Fragment } from 'react';
import Helmet from 'react-helmet/lib/Helmet';

import Combat from '../../pages/Combat';
import Home from '../../pages/Home';
import Player from '../../pages/Player';
import PlayerForm from '../../pages/PlayerForm';

import DiceDialog from '../dice/Dialog';

const Root = () => (
  <Fragment>
    <Helmet>
      <html lang={navigator.language} />
    </Helmet>

    <Home />
    <PlayerForm />
    <Player />
    <Combat />

    <DiceDialog />
  </Fragment>
);

export default Root;
