import { useRef } from "react";
import {
  type Location,
  Route,
  Routes,
  useLocation,
  useMatch,
} from "react-router-dom";

import Combat from "../Combat";
import ScreenDialog from "../ScreenDialog";

const path = "/player/:playerId/combat";

const CombatView = () => {
  const combatMatch = useMatch({
    end: false,
    path,
  });

  const location = useLocation();
  const locationRef = useRef<Location>();

  if (combatMatch) {
    locationRef.current = location;
  }

  return (
    <ScreenDialog open={Boolean(combatMatch)}>
      <Routes location={locationRef.current}>
        <Route element={<Combat />} path={path} />
      </Routes>
    </ScreenDialog>
  );
};

export default CombatView;
