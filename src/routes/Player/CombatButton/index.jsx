import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { SwordCross } from 'mdi-material-ui';

import DialogFab from '../../../components/DialogFab';
import { startCombat } from '../../../ducks/combat';
import { addMonster } from '../../../ducks/monsters';
import createMonster from '../../../utils/createMonster';

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

const CombatButton = ({ playerId, ...rest }) => {
  const dispatch = useDispatch();

  return (
    <DialogFab
      data-screenshots="combat-button"
      onClick={() => dispatch(goToCombat(playerId))}
      {...rest}
    >
      <SwordCross />
    </DialogFab>
  );
};

CombatButton.propTypes = {
  playerId: PropTypes.string.isRequired,
};

CombatButton.displayName = 'CombatButton';

export default CombatButton;
