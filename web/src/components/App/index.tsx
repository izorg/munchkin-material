import { domMax, LazyMotion } from "framer-motion";

import CombatView from "../CombatView";
import DiceDialog from "../DiceDialog";
import Home from "../Home";
import PlayerDialog from "../PlayerDialog";
import PlayerView from "../PlayerView";
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
      <PlayerView />
      <CombatView />
      <SettingsDialog />
      <DiceDialog />
      <PlayerDialog />
      <UndoSnackbar />
    </UndoProvider>
  </LazyMotion>
);

export default App;
