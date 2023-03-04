import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";

import { setCombatHelper } from "../../../ducks/combat";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";
import { type AvailableColor } from "../../../utils/availableColors";
import { useGoBack } from "../../../utils/location";
import PlayerAvatar from "../../PlayerAvatar";
import PlayerListItemText from "../../PlayerListItemText";

const HelperSelector = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const goBack = useGoBack();

  const helpers = usePresentSelector((state) => {
    const { combat, playerList, players } = state;

    return playerList
      .filter((id) => id !== combat.playerId)
      .map((id) => players[id]);
  });

  const open = new URLSearchParams(location.search).get("add") === "helper";

  const onClose = () => goBack();

  const onSelect = (id: string) => {
    dispatch(setCombatHelper(id));
    goBack();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          margin: 2,
        },
      }}
    >
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Choose helper"
          id="combat.helperSelector.title"
        />
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <List>
          {helpers.map((helper) => (
            <ListItemButton
              key={helper.id.toString()}
              onClick={() => onSelect(helper.id)}
            >
              <ListItemAvatar>
                <PlayerAvatar
                  color={helper.color as AvailableColor}
                  name={helper.name}
                />
              </ListItemAvatar>
              <PlayerListItemText player={helper} />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default HelperSelector;
