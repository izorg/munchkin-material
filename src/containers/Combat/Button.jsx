import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { goToCombat } from '../../actions';
import Combat from '../../components/Fab/Combat';
import Transition from '../../components/Fab/Transition';

const mapStateToProps = state => ({
  fullVersion: state.app.fullVersion,
  playerId: state.app.activePlayerId,
});

const mapDispatchToProps = {
  onClick: goToCombat,
};

const CombatButton = ({ fullVersion, onClick, playerId }) => (
  <Route exact path="/player/:id">
    {({ match }) => (
      <Transition in={Boolean(match)}>
        <Combat fullVersion={fullVersion} onClick={onClick} playerId={playerId} />
      </Transition>
    )}
  </Route>
);

CombatButton.propTypes = {
  fullVersion: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  playerId: PropTypes.number.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CombatButton));
