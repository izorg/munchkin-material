import { css } from "@emotion/react";
import { mdiDragHorizontalVariant as dragIcon } from "@mdi/js";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  SvgIcon,
} from "@mui/material";
import PropTypes from "prop-types";

import PlayerAvatar from "../../../../components/PlayerAvatar";
import PlayerListItemText from "../../../../components/PlayerListItemText";
import { AvailableColor } from "../../../../utils/availableColors";
import usePresentSelector from "../../../../utils/usePresentSelector";

const HomePlayerListOverlayItem = (props: { playerId: string }) => {
  const { playerId } = props;

  const players = usePresentSelector((state) => state.players);
  const player = players[playerId];

  return (
    <ListItem
      component="div"
      css={css`
        @supports (padding: max(0px)) {
          & > .MuiListItemButton-root {
            padding-right: calc(32px + max(16px, env(safe-area-inset-right)));
          }

          & > .MuiListItemSecondaryAction-root {
            right: max(16px, env(safe-area-inset-right));
          }
        }
      `}
      disablePadding
      secondaryAction={
        <IconButton component="span" disableRipple edge="end">
          <SvgIcon>
            <path d={dragIcon} />
          </SvgIcon>
        </IconButton>
      }
    >
      <ListItemButton
        css={[
          css`
            @supports (padding: max(0px)) {
              padding-left: max(16px, env(safe-area-inset-left));
              padding-right: max(16px, env(safe-area-inset-right));
            }

            &:hover {
              background-color: transparent;
            }
          `,
        ]}
      >
        <ListItemAvatar>
          <PlayerAvatar
            color={player.color as AvailableColor}
            name={player.name}
          />
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
