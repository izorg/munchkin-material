import { type Player } from "../../../domains/player";
import { togglePlayer, unselectAllPlayers } from "../../../ducks/ui";
import useMultiMode from "../../../hooks/useMultiMode";
import { useAppDispatch } from "../../../store";

export const useActivateMultiSelect = () => {
  const dispatch = useAppDispatch();
  const { setMultiMode } = useMultiMode();

  return (playerId: Player["id"]) => {
    dispatch(unselectAllPlayers());
    dispatch(togglePlayer(playerId));

    setMultiMode(true);
  };
};
