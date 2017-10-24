import React from 'react';
import { connectAdvanced } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { goToCombat } from '../../actions';
import Combat from '../../components/Fab/Combat';
import Transition from '../../components/Fab/Transition';

const selectorFactory = dispatch => state => ({
  fullVersion: state.app.fullVersion,
  onClick: () => dispatch(goToCombat(state.app.activePlayerId)),
});

const CombatButton = ({ fullVersion, onClick }) => (
  <Route exact path="/player/:id">
    {({ match }) => (
      <Transition in={Boolean(match)}>
        <Combat fullVersion={fullVersion} onClick={onClick} />
      </Transition>
    )}
  </Route>
);

CombatButton.propTypes = {
  fullVersion: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connectAdvanced(selectorFactory)(CombatButton);
