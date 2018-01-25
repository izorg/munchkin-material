import React, { Fragment } from 'react';
import Helmet from 'react-helmet/es/Helmet';

import Mobile from '../../structures/Mobile';

import DiceDialog from '../dice/Dialog';

const Root = () => (
  <Fragment>
    <Helmet>
      <html lang={navigator.language} />
    </Helmet>

    <Mobile />

    <DiceDialog />
  </Fragment>
);

export default Root;
