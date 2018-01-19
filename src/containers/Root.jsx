import React, { Fragment } from 'react';
import Helmet from 'react-helmet/es/Helmet';
import Hidden from 'material-ui/Hidden';

import Mobile from '../screens/Mobile';
import Tablet from '../screens/Tablet';

import DiceDialog from './DiceDialog';

const Root = () => (
  <Fragment>
    <Helmet>
      <html lang={navigator.language} />
    </Helmet>

    <Hidden smUp>
      <Mobile />
    </Hidden>

    <Hidden xsDown>
      <Tablet />
    </Hidden>

    <DiceDialog />
  </Fragment>
);

export default Root;
