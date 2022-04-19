import { mdiBackupRestore } from "@mdi/js";
import { type IconButtonProps, SvgIcon, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";
import { ActionCreators } from "redux-undo";

import TopIconButton from "../../../../components/TopIconButton";
import { useUndo } from "../../../../components/UndoProvider";
import { resetPlayers } from "../../../../ducks/players";
import { useAppDispatch } from "../../../../store";
import usePresentSelector from "../../../../utils/usePresentSelector";

const ResetButton = (props: IconButtonProps) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const disabled = usePresentSelector((state) => {
    const {
      combat: { playerBonus, playerId },
      playerList,
      players,
      settings: { singleMode },
    } = state;

    if (singleMode) {
      const player = players[playerId as string];

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

        dispatch(resetPlayers([id as string]));
        dispatch(ActionCreators.clearHistory());
      } else {
        setMessage(
          intl.formatMessage({
            defaultMessage: "Players have been reset",
            id: "undo.resetPlayers",
          })
        );
        dispatch(resetPlayers(playerList));
      }
    });

  const button = (
    <TopIconButton disabled={disabled} onClick={onClick} {...props}>
      <SvgIcon>
        <path d={mdiBackupRestore} />
      </SvgIcon>
    </TopIconButton>
  );

  if (disabled) {
    return button;
  }

  return (
    <Tooltip
      title={intl.formatMessage({
        defaultMessage: "Reset",
        id: "player.list.reset",
      })}
    >
      {button}
    </Tooltip>
  );
};

export default ResetButton;
