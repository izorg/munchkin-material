import { ListItemAvatar, ListItemButton } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import PlayerAvatar from "../../../../components/PlayerAvatar";
import PlayerListItemText from "../../../../components/PlayerListItemText";
import { type AvailableColor } from "../../../../utils/availableColors";
import { playerShape } from "../../../../utils/propTypes";
import { type Player } from "../../../../utils/types";

type PlayerListItemProps = {
  player: Player;
  selected: boolean;
};

const PlayerListItem = (props: PlayerListItemProps) => {
  const { player, selected } = props;

  const navigate = useNavigate();

  return (
    <ListItemButton
      component={motion.div}
      onTap={() => navigate(`/player/${player.id}`, { replace: true })}
      selected={selected}
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
