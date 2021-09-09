import { List, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Item from "./Item";

const displayName = "PlayerList";

const PlayerList = ({ selectedPlayerId, ...props }) => {
  const playerList = useSelector((state) => state.present.playerList);
  const players = useSelector((state) => state.present.players);

  return (
    <List
      component={(listProps) => <Paper elevation={2} square {...listProps} />}
      {...props}
    >
      {playerList.map((playerId) => (
        <Item
          key={playerId}
          player={players[playerId]}
          selected={playerId === selectedPlayerId}
        />
      ))}
    </List>
  );
};

PlayerList.propTypes = {
  selectedPlayerId: PropTypes.string.isRequired,
};

PlayerList.displayName = displayName;

export default PlayerList;
