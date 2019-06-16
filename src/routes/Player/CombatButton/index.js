import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { startCombat } from '../../../ducks/combat';
import { addMonster } from '../../../ducks/monsters';
import createMonster from '../../../utils/createMonster';

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
    } catch (error) {
      // no full version
    }
  } else {
    dispatch(push(`/player/${playerId}/combat`));
  }
};

const mapDispatchToProps = {
  goToCombat,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
