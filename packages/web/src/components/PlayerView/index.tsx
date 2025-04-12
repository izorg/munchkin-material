import Player from "../Player";
import { RouteScreenDialog } from "../RouteScreenDialog";

const path = "/player/:playerId/*";

const PlayerView = () => (
  <RouteScreenDialog path={path}>
    <Player />
  </RouteScreenDialog>
);

export default PlayerView;
