import { useCallback } from "react";
import { FormattedMessage } from "react-intl";

import { useUndo } from "../components/UndoProvider";
import { removePlayers } from "../ducks/players";
import { useAppDispatch } from "../store";

const useDeletePlayers = (): ((players: string[]) => void) => {
  const dispatch = useAppDispatch();
  const { setMessage } = useUndo();

  return useCallback(
    (players) => {
      dispatch(removePlayers(players));

      setMessage(
        <FormattedMessage
          defaultMessage="{count, plural, one {Player has} other {Players have}} been removed"
          id="undo.deletePlayers"
          values={{
            count: players.length,
          }}
        />
      );
    },
    [dispatch, setMessage]
  );
};

export default useDeletePlayers;
