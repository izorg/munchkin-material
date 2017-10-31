import React from 'react';
import { connectAdvanced } from 'react-redux';
import { Route } from 'react-router-dom';

import { goToCombat } from '../../actions';
import Fab from '../../components/fab2/Container';
import Combat from '../../components/fab2/Combat';
import Transition from '../../components/fab2/Transition';

const selectorFactory = dispatch => state => ({
  fullVersion: state.app.fullVersion,
  onClick: () => dispatch(goToCombat(state.app.activePlayerId)),
});

const CombatButton = props => (
  <Route exact path="/player/:id">
    {({ match }) => (
      <Transition in={Boolean(match)}>
        <Fab>
          <Combat {...props} />
        </Fab>
      </Transition>
    )}
  </Route>
);

export default connectAdvanced(selectorFactory)(CombatButton);
