import Home from "../Home";
import ScreenDialog from "../ScreenDialog";

const transitionProps = { appear: false };

const HomeView = () => (
  <ScreenDialog open TransitionProps={transitionProps}>
    <Home />
  </ScreenDialog>
);

export default HomeView;
