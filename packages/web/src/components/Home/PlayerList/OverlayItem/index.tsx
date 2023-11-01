import { mdiDragHorizontalVariant as dragIcon } from "@mdi/js";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  Paper,
  SvgIcon,
} from "@mui/material";
import PropTypes from "prop-types";
import { type FC } from "react";

import usePresentSelector from "../../../../hooks/usePresentSelector";
import PlayerAvatar from "../../../PlayerAvatar";
import PlayerListItemText from "../../../PlayerListItemText";

type HomePlayerListOverlayItemProps = { playerId: string };

const HomePlayerListOverlayItem: FC<HomePlayerListOverlayItemProps> = (
  props,
) => {
  const { playerId } = props;

  const players = usePresentSelector((state) => state.players);
  const player = players[playerId];

  return (
    <ListItem
      component={Paper}
      elevation={1}
      secondaryAction={
        <IconButton
          component="span"
          disableRipple
          edge="end"
          sx={{
            touchAction: "none",
          }}
        >
          <SvgIcon>
            <path d={dragIcon} />
          </SvgIcon>
        </IconButton>
      }
      square
      sx={[
        {
          width: "100%",
        },
        {
          "@supports (padding: max(0px))": {
            paddingLeft: "max(16px, env(safe-area-inset-left))",
            paddingRight: "max(48px, calc(32px + env(safe-area-inset-right)))",
          },
        },
        {
          "@supports (padding: max(0px))": {
            "& > .MuiListItemButton-root": {
              paddingRight:
                "calc(32px + max(16px, env(safe-area-inset-right)))",
            },

            "& > .MuiListItemSecondaryAction-root": {
              right: "max(16px, env(safe-area-inset-right))",
            },
          },
        },
      ]}
    >
      <ListItemAvatar>
        <PlayerAvatar color={player.color} name={player.name} />
      </ListItemAvatar>

      <PlayerListItemText player={player} />
    </ListItem>
  );
};

HomePlayerListOverlayItem.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default HomePlayerListOverlayItem;
