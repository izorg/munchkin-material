import { mdiTrashCanOutline } from "@mdi/js";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  type MenuItemProps,
  styled,
  SvgIcon,
} from "@mui/material";
import { mergeProps } from "@react-aria/utils";
import { type MouseEventHandler } from "react";
import { FormattedMessage } from "react-intl";

import useDeletePlayers from "../../hooks/useDeletePlayers";
import { usePlayerId } from "../../hooks/usePlayerId";
import { useGoBack } from "../../utils/location";

const MenuItemIcon = styled(ListItemIcon)({
  color: "inherit",
});

export const PlayerDeleteMenuItem = (props: MenuItemProps) => {
  const goBack = useGoBack();

  const playerId = usePlayerId();
  const deletePlayers = useDeletePlayers();

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    void goBack();

    // Instead of subscribing to `Modal` transition events use `setTimeout` to execute player deletion when `RouteModal` started closing.
    globalThis.setTimeout(() => {
      deletePlayers([playerId]);
    });
  };

  return (
    <MenuItem {...mergeProps({ onClick }, props)}>
      <MenuItemIcon>
        <SvgIcon>
          <path d={mdiTrashCanOutline} />
        </SvgIcon>
      </MenuItemIcon>
      <ListItemText>
        <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
      </ListItemText>
    </MenuItem>
  );
};
