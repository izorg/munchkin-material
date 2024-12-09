import { mdiDragHorizontalVariant as dragIcon } from "@mdi/js";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  Paper,
  SvgIcon,
} from "@mui/material";
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
