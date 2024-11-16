import { domMax, LazyMotion } from "motion/react";

import CombatView from "../CombatView";
import DiceDialog from "../DiceDialog";
import HomeView from "../HomeView";
import PlayerDialog from "../PlayerDialog";
import PlayerView from "../PlayerView";
import SettingsDialog from "../SettingsDialog";
import UndoProvider from "../UndoProvider";
import UndoSnackbar from "../UndoSnackbar";

const App = () => (
  <LazyMotion features={domMax} strict>
    <UndoProvider>
      <HomeView />
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
