import React from 'react';
import { connectAdvanced } from 'react-redux';
import { Route } from 'react-router-dom';

import { goToCombat } from '../../actions';
import Combat from '../../components/Fab/Combat';
import Transition from '../../components/Fab/Transition';

const selectorFactory = dispatch => state => ({
  fullVersion: state.app.fullVersion,
  onClick: () => dispatch(goToCombat(state.app.activePlayerId)),
});

const CombatButton = props => (
  <Route exact path="/player/:id">
    {({ match }) => (
      <Transition in={Boolean(match)}>
        <Combat {...props} />
      </Transition>
    )}
  </Route>
);

export default connectAdvanced(selectorFactory)(CombatButton);
