import Home from "../Home";
import ScreenDialog from "../ScreenDialog";

const HomeView = () => (
  <ScreenDialog
    open
    slotProps={{
      transition: {
        appear: false,
      },
    }}
  >
    <Home />
  </ScreenDialog>
);

export default HomeView;
