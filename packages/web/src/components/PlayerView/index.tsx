import { useParams } from "react-router-dom";

import Player from "../Player";
import { RouteScreenDialog } from "../RouteScreenDialog";

const path = "/player/:playerId";

export const usePlayerId = () => {
  const { playerId } = useParams();

  if (!playerId) {
    throw new Error("playerId is not found in path");
  }

  return playerId;
};

const PlayerView = () => (
  <RouteScreenDialog path={path}>
    <Player />
  </RouteScreenDialog>
);

export default PlayerView;
