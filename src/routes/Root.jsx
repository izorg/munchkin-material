import React, { Fragment } from 'react';
import Helmet from 'react-helmet/es/Helmet';

import DiceDialog from '../containers/DiceDialog';

import Combat from './Combat';
import Home from './Home';
import Player from './Player';
import PlayerForm from './PlayerForm';

const Root = () => (
  <Fragment key="Root">
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
