import { mdiDragHorizontalVariant as dragIcon } from "@mdi/js";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  SvgIcon,
} from "@mui/material";
import PropTypes from "prop-types";

import usePresentSelector from "../../../../hooks/usePresentSelector";
import PlayerAvatar from "../../../PlayerAvatar";
import PlayerListItemText from "../../../PlayerListItemText";

const HomePlayerListOverlayItem = (props: { playerId: string }) => {
  const { playerId } = props;

  const players = usePresentSelector((state) => state.players);
  const player = players[playerId];

  return (
    <ListItem
      component="div"
      disablePadding
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
      sx={{
        "@supports (padding: max(0px))": {
          "& > .MuiListItemButton-root": {
            paddingRight: "calc(32px + max(16px, env(safe-area-inset-right)))",
          },

          "& > .MuiListItemSecondaryAction-root": {
            right: "max(16px, env(safe-area-inset-right))",
          },
        },
      }}
    >
      <ListItemButton
        sx={[
          {
            width: "100%",
          },
          {
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
          {
            "@supports (padding: max(0px))": {
              paddingLeft: "max(16px, env(safe-area-inset-left))",
              paddingRight: "max(16px, env(safe-area-inset-right))",
            },
          },
        ]}
      >
        <ListItemAvatar>
          <PlayerAvatar color={player.color} name={player.name} />
        </ListItemAvatar>

        <PlayerListItemText player={player} />
      </ListItemButton>
    </ListItem>
  );
};

HomePlayerListOverlayItem.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default HomePlayerListOverlayItem;
