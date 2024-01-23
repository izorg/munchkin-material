import Combat from "../Combat";
import { RouteScreenDialog } from "../RouteScreenDialog";

const path = "/player/:playerId/combat";

const CombatView = () => (
  <RouteScreenDialog path={path}>
    <Combat />
  </RouteScreenDialog>
);

export default CombatView;
