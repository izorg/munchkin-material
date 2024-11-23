import { mdiSwordCross } from "@mdi/js";
import { type FabProps, SvgIcon } from "@mui/material";
import { type FC } from "react";
import { useNavigate } from "react-router";

import { startCombat } from "../../../ducks/combat/actions";
import { usePlayerId } from "../../../hooks/usePlayerId";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";
import ScreenFab from "../../ScreenFab";

type CombatButtonProps = FabProps;

const CombatButton: FC<CombatButtonProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const playerId = usePlayerId();

  const combatFinished = usePresentSelector((state) => state.combat.finished);
  const combatPlayerId = usePresentSelector((state) => state.combat.playerId);

  const goToCombat = async () => {
    if (combatFinished || playerId !== combatPlayerId) {
      dispatch(startCombat(playerId));
    }

    await navigate(`/player/${playerId}/combat`);
  };

  return (
    <ScreenFab
      data-screenshots="combat-button"
      onClick={() => goToCombat()}
      {...props}
    >
      <SvgIcon>
        <path d={mdiSwordCross} />
      </SvgIcon>
    </ScreenFab>
  );
};

export default CombatButton;
