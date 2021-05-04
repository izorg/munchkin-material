import { Tooltip } from "@material-ui/core";
import { BackupRestore } from "mdi-material-ui";
import { defineMessages, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";

import TopIconButton from "../../../../components/TopIconButton";
import { useUndo } from "../../../../components/UndoProvider";
import { resetPlayers } from "../../../../ducks/players";

const displayName = "ResetButton";

const messages = defineMessages({
  reset: {
    defaultMessage: "Reset",
    id: "player.list.reset",
  },

  undo: {
    defaultMessage: "Players have been reset",
    id: "undo.resetPlayers",
  },
});

const ResetButton = (props) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const disabled = useSelector((state) => {
    const {
      combat: { playerBonus, playerId },
      playerList,
      players,
      settings: { singleMode },
    } = state.present;

    if (singleMode) {
      const player = players[playerId];

      return player.level === 1 && player.gear === 0 && playerBonus === 0;
    }

    return playerList.every((id) => {
      const player = players[id];

      return player.level === 1 && player.gear === 0;
    });
  });

  const { setMessage } = useUndo();

  const onClick = () =>
    dispatch((_, getState) => {
      const {
        combat,
        playerList,
        settings: { singleMode },
      } = getState().present;

      if (singleMode) {
        const { playerId: id } = combat;

        dispatch(resetPlayers([id]));
        dispatch(ActionCreators.clearHistory());
      } else {
        setMessage(intl.formatMessage(messages.undo));
        dispatch(resetPlayers(playerList));
      }
    });

  const button = (
    <TopIconButton disabled={disabled} onClick={onClick} {...props}>
      <BackupRestore />
    </TopIconButton>
  );

  if (disabled) {
    return button;
  }

  return <Tooltip title={intl.formatMessage(messages.reset)}>{button}</Tooltip>;
};

ResetButton.displayName = displayName;

export default ResetButton;
