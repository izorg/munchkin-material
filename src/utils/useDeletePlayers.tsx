import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";

import { useUndo } from "../components/UndoProvider";
import { removePlayers } from "../ducks/players";

const useDeletePlayers = (): ((players: string[]) => void) => {
  const dispatch = useDispatch();
  const { setMessage } = useUndo();

  return useCallback(
    (players) => {
      dispatch(removePlayers(players));

      setMessage(
        <FormattedMessage
          defaultMessage="{count, plural, one {Player has} other {Players have}} been removed"
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
