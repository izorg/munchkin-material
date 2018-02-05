import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Route from 'react-router-dom/Route';
import { goBack, push } from 'connected-react-router/lib/actions';
import { addMonster } from 'munchkin-core/lib/actions';
import createMonster from 'munchkin-core/lib/utils/createMonster';

import Component from './Component';

const mapStateToProps = (state) => ({
  helper: !state.combat.helperId && state.playerList.length > 1,
  playerId: state.combat.playerId,
});

const mapDispatchToProps = {
  onAdd: (playerId) => push(`/player/${playerId}/combat/add`),
  onBackdropClick: goBack,
  onMonsterAdd: (back) => (dispatch) => {
    dispatch(addMonster(createMonster()));

    if (back) {
      dispatch(goBack());
    }
  },
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(
  Component,
);

const HelperButton = () => (
  <Fragment>
    <Route exact path="/player/:id/combat/add">
      {({ match }) => <ConnectedComponent expanded={Boolean(match)} />}
    </Route>
  </Fragment>
);

export default HelperButton;
