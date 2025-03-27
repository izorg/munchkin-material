import Home from "../Home";
import ScreenDialog from "../ScreenDialog";

const transitionProps = { appear: false };

const HomeView = () => (
  <ScreenDialog open slotProps={{ transition: transitionProps }}>
    <Home />
  </ScreenDialog>
);

export default HomeView;
