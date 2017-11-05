import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { go, goBack } from 'react-router-redux';
import { setCombatHelper } from 'munchkin-core/es/actions';

import HelperSelector from '../../components/Combat/HelperSelector';

const mapStateToProps = state => ({
  helpers: state.playerList
    .filter(id => id !== state.combat.playerId)
    .map(id => state.players[id]),
});

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(goBack()),
  onSelect: (id) => {
    dispatch(setCombatHelper(id));
    dispatch(go(-2));
  },
});

const CombatHelperSelector = props => (
  <Route exact path="/player/:id/combat/add/helper">
    {({ match }) => (
      <HelperSelector {...props} open={!!match} />
    )}
  </Route>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { pure: false },
)(CombatHelperSelector);
