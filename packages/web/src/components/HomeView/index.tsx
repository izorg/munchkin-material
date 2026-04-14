import Home from "../Home";
import { ScreenModal } from "../ScreenModal";

const HomeView = () => (
  <ScreenModal appear={false} open>
    <Home />
  </ScreenModal>
);

export default HomeView;
