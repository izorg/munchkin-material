import { ClassNames, css } from "@emotion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItemAvatar,
  ListItemButton,
  useTheme,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import PlayerAvatar from "../../../components/PlayerAvatar";
import PlayerListItemText from "../../../components/PlayerListItemText";
import { setCombatHelper } from "../../../ducks/combat";
import { useGoBack, useLocationQuery } from "../../../utils/location";

const HelperSelector = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const goBack = useGoBack();

  const helpers = useSelector((state) => {
    const { combat, playerList, players } = state.present;

    return playerList
      .filter((id) => id !== combat.playerId)
      .map((id) => players[id]);
  });

  const query = useLocationQuery();
  const open = query.add === "helper";

  const onClose = () => goBack();

  const onSelect = (id) => {
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
          onClose={onClose}
          open={open}
          {...props}
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
                    <PlayerAvatar color={helper.color} name={helper.name} />
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
