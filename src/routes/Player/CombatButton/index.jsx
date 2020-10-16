import { SwordCross } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFullVersion } from '../../../components/FullVersionProvider';
import ScreenFab from '../../../components/ScreenFab';
import { startCombat } from '../../../ducks/combat';

const displayName = 'CombatButton';

const CombatButton = ({ playerId, ...rest }) => {
  const { cordova } = window;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const combatFinished = useSelector((state) => state.present.combat.finished);
  const combatPlayerId = useSelector((state) => state.present.combat.playerId);

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

    navigate(`/player/${playerId}/combat`);
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
