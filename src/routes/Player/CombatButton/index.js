import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { addMonster, createMonster, startCombat } from 'munchkin-core';

import Component from './Component';

const goToCombat = (playerId) => async (dispatch, getState) => {
  const {
    app: { combatFinished },
    combat: { playerId: combatPlayerId },
  } = getState();

  if (combatFinished || playerId !== combatPlayerId) {
    try {
      await dispatch(startCombat(playerId));
      dispatch(addMonster(createMonster()));
      dispatch(push(`/player/${playerId}/combat`));
    } catch (error) {}
  } else {
    dispatch(push(`/player/${playerId}/combat`));
  }
};

const mapDispatchToProps = {
  goToCombat,
};

export default compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
)(Component);
