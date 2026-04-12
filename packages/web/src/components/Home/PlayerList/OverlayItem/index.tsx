import { ListItem, ListItemAvatar } from "@mui/material";
import { type FC } from "react";

import usePresentSelector from "../../../../hooks/usePresentSelector";
import PlayerAvatar from "../../../PlayerAvatar";
import PlayerListItemText from "../../../PlayerListItemText";
import { DragIconButton } from "../Item/DragIconButton";

type HomePlayerListOverlayItemProps = { playerId: string };

const HomePlayerListOverlayItem: FC<HomePlayerListOverlayItemProps> = (
  props,
) => {
  const { playerId } = props;

  const players = usePresentSelector((state) => state.players);
  const player = players[playerId];

  return (
    <ListItem
      secondaryAction={
        <DragIconButton
          component="span"
          disableRipple
          edge="end"
          sx={{
            touchAction: "none",
          }}
        />
      }
      sx={[
        (theme) => ({
          backgroundColor: theme.vars.palette.background.paper,
          boxShadow: theme.vars.shadows[1],
          width: "100%",
        }),
        (theme) =>
          theme.direction === "rtl"
            ? {
                paddingLeft: "calc(48px + var(--inset-right)) /*! @noflip */",
                paddingRight: "calc(16px + var(--inset-left)) /*! @noflip */",
              }
            : {
                paddingLeft: "calc(16px + var(--inset-left)) /*! @noflip */",
                paddingRight: "calc(48px + var(--inset-right)) /*! @noflip */",
              },
        (theme) => ({
          "& > .MuiListItemButton-root":
            theme.direction === "rtl"
              ? {
                  paddingLeft: "calc(48px + var(--inset-left)) /*! @noflip */",
                }
              : {
                  paddingRight:
                    "calc(48px + var(--inset-right)) /*! @noflip */",
                },

          "& > .MuiListItemSecondaryAction-root":
            theme.direction === "rtl"
              ? {
                  left: "calc(16px + var(--inset-left)) /*! @noflip */",
                }
              : {
                  right: "calc(16px + var(--inset-right)) /*! @noflip */",
                },
        }),
      ]}
    >
      <ListItemAvatar>
        <PlayerAvatar color={player.color} name={player.name} />
      </ListItemAvatar>

      <PlayerListItemText player={player} />
    </ListItem>
  );
};

export default HomePlayerListOverlayItem;
