import { SwordCross } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useFullVersion } from '../../../components/FullVersionProvider';
import ScreenFab from '../../../components/ScreenFab';
import { startCombat } from '../../../ducks/combat';

const displayName = 'CombatButton';

const CombatButton = ({ playerId, ...rest }) => {
  const { cordova } = window;

  const dispatch = useDispatch();
  const history = useHistory();

  const combatFinished = useSelector((state) => state.combat.finished);
  const combatPlayerId = useSelector((state) => state.combat.playerId);

  const { buyFullVersion, fullVersion } = useFullVersion();

  const goToCombat = async () => {
    if (combatFinished || playerId !== combatPlayerId) {
      if (!fullVersion && cordova?.platformId !== 'ios') {
        try {
          await buyFullVersion();
        } catch (error) {
          return;
        }
      }

      dispatch(startCombat(playerId));
    }

    history.push(`/player/${playerId}/combat`);
  };

  return (
    <ScreenFab
      data-screenshots="combat-button"
      onClick={() => goToCombat()}
      {...rest}
    >
      <SwordCross />
    </ScreenFab>
  );
};

CombatButton.propTypes = {
  playerId: PropTypes.string.isRequired,
};

CombatButton.displayName = displayName;

export default CombatButton;
