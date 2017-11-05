import React from 'react';
import { connectAdvanced } from 'react-redux';
import { Route } from 'react-router-dom';
import getContext from 'recompose/getContext';
import PropTypes from 'prop-types';

import { goToCombat } from '../../actions';
import Fab from '../../components/fab/Container';
import Combat from '../../components/fab/Combat';
import Transition from '../../components/fab/Transition';

const selectorFactory = dispatch => (state, ownProps) => ({
  fullVersion: state.app.fullVersion,
  onClick: () => {
    if (state.app.fullVersion) {
      dispatch(goToCombat(state.app.activePlayerId));
    } else {
      ownProps.buyFullVersion();
    }
  },
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

const contextTypes = {
  buyFullVersion: PropTypes.func,
};

export default getContext(contextTypes)(connectAdvanced(selectorFactory)(CombatButton));
