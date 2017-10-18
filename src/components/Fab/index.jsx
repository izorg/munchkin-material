import React from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import { classesObject } from '../../utils/propTypes';

import Transition from './Transition';
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

const MainButton = ({ classes }) => (
  <div className={classes.fabContainer}>
    <Route exact path="/">
      {({ match }) => (
        <Transition in={Boolean(match)}>
          <NewPlayerButton />
        </Transition>
      )}
    </Route>

    <Route exact path="/player/:id">
      {({ match }) => (
        <Transition in={Boolean(match)}>
          <CombatButton />
        </Transition>
      )}
    </Route>

    <Route path="/player/:id/combat">
      {({ match }) => (
        <Transition in={Boolean(match)}>
          <CombatHelperButton />
        </Transition>
      )}
    </Route>
  </div>
);

MainButton.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(MainButton);
