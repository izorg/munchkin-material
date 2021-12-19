import {
  ListItemAvatar,
  ListItemButton,
  type ListItemButtonProps,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import PlayerAvatar from "../../../../components/PlayerAvatar";
import PlayerListItemText from "../../../../components/PlayerListItemText";
import { type AvailableColor } from "../../../../utils/availableColors";
import { playerShape } from "../../../../utils/propTypes";
import { type Player } from "../../../../utils/types";

type PlayerListItemProps = { player: Player } & ListItemButtonProps;

const PlayerListItem = ({ player, ...props }: PlayerListItemProps) => {
  const navigate = useNavigate();

  return (
    <ListItemButton
      onClick={() => navigate(`/player/${player.id}`, { replace: true })}
      {...props}
    >
      <ListItemAvatar>
        <PlayerAvatar
          color={player.color as AvailableColor}
          name={player.name}
        />
      </ListItemAvatar>
      <PlayerListItemText player={player} />
    </ListItemButton>
  );
};

PlayerListItem.propTypes = {
  player: playerShape.isRequired,
};

export default PlayerListItem;
