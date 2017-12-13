import React from 'react';
import Helmet from 'react-helmet/es/Helmet';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../utils/propTypes';

import DiceDialog from '../containers/DiceDialog';

import Combat from './Combat';
import Home from './Home';
import PlayerForm from './PlayerForm';
import Player from './Player';

const styles = {
  root: {
    backgroundColor: '#000000',
    height: '100%',
    position: 'relative',
  },
};

const Root = ({ classes }) => (
  <div className={classes.root}>
    <Helmet>
      <html lang={navigator.language} />
    </Helmet>

    <Home />
    <PlayerForm />
    <Player />
    <Combat />

    <DiceDialog />
  </div>
);

Root.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(Root);
