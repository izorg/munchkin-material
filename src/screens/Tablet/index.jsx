import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';

import Title from '../../components/Title';

const styles = {
  content: {
    alignItems: 'stretch',
    display: 'flex',
    flex: 1,
  },

  tablet: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
};

const Tablet = ({ classes }) => (
  <div className={classes.tablet}>
    <AppBar className={classes.appBar} color="primary" position="static">
      <Toolbar>
        <Title>Header</Title>
      </Toolbar>
    </AppBar>
    <div className={classes.content}>
      Tablet
    </div>
  </div>
);

export default withStyles(styles)(Tablet);
