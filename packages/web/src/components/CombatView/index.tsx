import Combat from "../Combat";
import { RouteScreenModal } from "../RouteScreenModal";

const path = "/player/:playerId/combat/*";

const CombatView = () => (
  <RouteScreenModal path={path}>
    <Combat />
  </RouteScreenModal>
);

export default CombatView;
