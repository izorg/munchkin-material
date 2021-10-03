import { List, ListProps, Paper } from "@mui/material";
import PropTypes from "prop-types";

import usePresentSelector from "../../../utils/usePresentSelector";

import Item from "./Item";

type PlayerListProps = { selectedPlayerId: string } & ListProps;

const PlayerList = ({
  selectedPlayerId,
  ...props
}: PlayerListProps): JSX.Element => {
  const playerList = usePresentSelector((state) => state.playerList);
  const players = usePresentSelector((state) => state.players);

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

export default PlayerList;
