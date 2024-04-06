import {
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useSearchParams } from "react-router-dom";

import { setCombatHelper } from "../../../ducks/combat/actions";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";
import { useGoBack } from "../../../utils/location";
import CancelButton from "../../CancelButton";
import PlayerAvatar from "../../PlayerAvatar";
import PlayerListItemText from "../../PlayerListItemText";

const HelperSelector = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const goBack = useGoBack();

  const playerId = usePresentSelector((state) => state.combat.playerId);
  const playerList = usePresentSelector((state) => state.playerList);
  const players = usePresentSelector((state) => state.players);

  const helpers = useMemo(
    () => playerList.filter((id) => id !== playerId).map((id) => players[id]),
    [playerId, playerList, players],
  );

  const open = searchParams.get("add") === "helper";

  const onSelect = (id: string) => {
    dispatch(setCombatHelper(id));
    goBack();
  };

  return (
    <Dialog onClose={goBack} open={open}>
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Choose helper"
          id="combat.helperSelector.title"
        />
      </DialogTitle>
      <List component="div">
        {helpers.map((helper) => (
          <ListItemButton key={helper.id} onClick={() => onSelect(helper.id)}>
            <ListItemAvatar>
              <PlayerAvatar color={helper.color} name={helper.name} />
            </ListItemAvatar>
            <PlayerListItemText player={helper} />
          </ListItemButton>
        ))}
      </List>
      <DialogActions>
        <CancelButton onClick={goBack} />
      </DialogActions>
    </Dialog>
  );
};

export default HelperSelector;
