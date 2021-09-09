import { ListItemAvatar, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PlayerAvatar from "../../../../components/PlayerAvatar";
import PlayerListItemText from "../../../../components/PlayerListItemText";
import { playerShape } from "../../../../utils/propTypes";

const displayName = "PlayerListItem";

const PlayerListItem = ({ player, ...props }) => {
  const navigate = useNavigate();

  return (
    <ListItemButton
      onClick={() => navigate(`/player/${player.id}`, { replace: true })}
      {...props}
    >
      <ListItemAvatar>
        <PlayerAvatar color={player.color} name={player.name} />
      </ListItemAvatar>
      <PlayerListItemText player={player} />
    </ListItemButton>
  );
};

PlayerListItem.propTypes = {
  player: playerShape.isRequired,
};

PlayerListItem.displayName = displayName;

export default PlayerListItem;
