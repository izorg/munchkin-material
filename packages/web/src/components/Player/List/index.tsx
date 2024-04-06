import { List, type ListProps, Paper } from "@mui/material";

import { usePlayerId } from "../../../hooks/usePlayerId";
import usePresentSelector from "../../../hooks/usePresentSelector";

import Item from "./Item";

type PlayerListProps = ListProps<typeof Paper>;

const PlayerList = (props: PlayerListProps) => {
  const selectedPlayerId = usePlayerId();

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

export default PlayerList;
