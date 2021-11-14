import { ClassNames, css } from "@emotion/react";
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
  useTheme,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import PlayerAvatar from "../../../components/PlayerAvatar";
import PlayerListItemText from "../../../components/PlayerListItemText";
import { setCombatHelper } from "../../../ducks/combat";
import type { AvailableColor } from "../../../utils/availableColors";
import { useGoBack } from "../../../utils/location";
import usePresentSelector from "../../../utils/usePresentSelector";

const HelperSelector = (props: Omit<DialogProps, "onClose" | "open">) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();

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

  const contentCss = css`
    padding: 0;
  `;

  return (
    <ClassNames>
      {({ css }) => (
        <Dialog
          classes={{
            paper: css`
              margin: ${theme.spacing(2)};
            `,
          }}
          {...props}
          onClose={onClose}
          open={open}
        >
          <DialogTitle>
            <FormattedMessage
              defaultMessage="Choose helper"
              id="combat.helperSelector.title"
            />
          </DialogTitle>
          <DialogContent css={contentCss}>
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
      )}
    </ClassNames>
  );
};

export default HelperSelector;
