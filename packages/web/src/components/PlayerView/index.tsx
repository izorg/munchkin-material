import Player from "../Player";
import { RouteScreenModal } from "../RouteScreenModal";

const path = "/player/:playerId/*";

const PlayerView = () => (
  <RouteScreenModal path={path}>
    <Player />
  </RouteScreenModal>
);

export default PlayerView;
