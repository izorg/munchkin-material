import { mdiSwordCross } from "@mdi/js";
import { type FabProps, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import { type VFC } from "react";
import { useNavigate } from "react-router-dom";

import ScreenFab from "../../../components/ScreenFab";
import { startCombat } from "../../../ducks/combat";
import { useAppDispatch } from "../../../store";
import usePresentSelector from "../../../utils/usePresentSelector";

type CombatButtonProps = { playerId: string } & FabProps;

const CombatButton: VFC<CombatButtonProps> = ({ playerId, ...rest }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const combatFinished = usePresentSelector((state) => state.combat.finished);
  const combatPlayerId = usePresentSelector((state) => state.combat.playerId);

  const goToCombat = () => {
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

export default CombatButton;
