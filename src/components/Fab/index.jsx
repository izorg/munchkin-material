import React from 'react';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../../utils/propTypes';

import CombatButton from '../../containers/Combat/Button';
import CombatHelperButton from '../../containers/Combat/HelperButton';
import NewPlayerButton from '../../containers/NewPlayerButton';

const styles = {
  fabContainer: {
    bottom: 24,
    position: 'absolute',
    right: 24,
    zIndex: 3,
  },
};

const Fab = ({ classes }) => (
  <div className={classes.fabContainer}>
    <NewPlayerButton />
    <CombatButton />
    <CombatHelperButton />
  </div>
);

Fab.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(Fab);
