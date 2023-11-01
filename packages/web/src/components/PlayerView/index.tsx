import { useRef } from "react";
import {
  type Location,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";

import Player from "../Player";
import ScreenDialog from "../ScreenDialog";

const path = "/player/:playerId/*";

export const usePlayerId = () => {
  const { playerId } = useParams();

  if (!playerId) {
    throw new Error("playerId is not found in path");
  }

  return playerId;
};

const PlayerView = () => {
  const playerMatch = useMatch({
    end: false,
    path,
  });

  const location = useLocation();
  const locationRef = useRef<Location>();

  if (playerMatch) {
    locationRef.current = location;
  }

  return (
    <ScreenDialog open={Boolean(playerMatch)}>
      <Routes location={locationRef.current}>
        <Route element={<Player />} path={path} />
      </Routes>
    </ScreenDialog>
  );
};

export default PlayerView;
