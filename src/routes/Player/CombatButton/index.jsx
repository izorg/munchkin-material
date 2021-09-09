import { SvgIcon } from "@material-ui/core";
import { mdiSwordCross } from "@mdi/js";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ScreenFab from "../../../components/ScreenFab";
import { startCombat } from "../../../ducks/combat";

const displayName = "CombatButton";

const CombatButton = ({ playerId, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const combatFinished = useSelector((state) => state.present.combat.finished);
  const combatPlayerId = useSelector((state) => state.present.combat.playerId);

  const goToCombat = async () => {
    if (combatFinished || playerId !== combatPlayerId) {
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
      <SvgIcon>
        <path d={mdiSwordCross} />
      </SvgIcon>
    </ScreenFab>
  );
};

CombatButton.propTypes = {
  playerId: PropTypes.string.isRequired,
};

CombatButton.displayName = displayName;

export default CombatButton;
