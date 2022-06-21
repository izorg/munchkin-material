import { List, type ListProps, Paper } from "@mui/material";
import PropTypes from "prop-types";

import usePresentSelector from "../../../hooks/usePresentSelector";

import Item from "./Item";

type PlayerListProps = { selectedPlayerId: string } & ListProps<typeof Paper>;

const PlayerList = ({ selectedPlayerId, ...props }: PlayerListProps) => {
  const playerList = usePresentSelector((state) => state.playerList);
  const players = usePresentSelector((state) => state.players);

  return (
    <List component={Paper} disablePadding elevation={2} square {...props}>
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

export default PlayerList;
