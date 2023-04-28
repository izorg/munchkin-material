import { domMax, LazyMotion } from "framer-motion";

import DiceDialog from "../DiceDialog";
import Home from "../Home";
import PlayerDialog from "../PlayerDialog";
import ScreenDialog from "../ScreenDialog";
import SettingsDialog from "../SettingsDialog";
import UndoProvider from "../UndoProvider";
import UndoSnackbar from "../UndoSnackbar";

const App = () => (
  <LazyMotion features={domMax} strict>
    <UndoProvider>
      <ScreenDialog open TransitionProps={{ appear: false }}>
        <Home />
      </ScreenDialog>
      <SettingsDialog />
      <DiceDialog />
      <PlayerDialog />
      <UndoSnackbar />
    </UndoProvider>
  </LazyMotion>
);

export default App;
