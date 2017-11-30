import React from 'react';
import Helmet from 'react-helmet/es/Helmet';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../utils/propTypes';

import Combat from './Combat';
import Home from './Home';
import PlayerForm from './PlayerForm';
import Player from './Player';

const styles = {
  app: {
    backgroundColor: '#000000',
    height: '100%',
    position: 'relative',
  },
};

const App = ({ classes }) => (
  <div className={classes.app}>
    <Helmet>
      <html lang={navigator.language} />
    </Helmet>

    <Home />
    <PlayerForm />
    <Player />
    <Combat />
  </div>
);

App.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(App);
