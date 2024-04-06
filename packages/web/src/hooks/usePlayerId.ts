import { useParams } from "react-router-dom";

export const usePlayerId = () => {
  const { playerId } = useParams();

  if (!playerId) {
    throw new Error("playerId is not found in path");
  }

  return playerId;
};
