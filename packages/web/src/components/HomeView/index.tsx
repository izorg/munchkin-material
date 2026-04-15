import { RouteModal } from "../../domains/ui";
import Home from "../Home";

const HomeView = () => (
  <RouteModal open>
    <Home />
  </RouteModal>
);

export default HomeView;
