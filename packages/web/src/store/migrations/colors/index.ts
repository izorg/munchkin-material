/* istanbul ignore file */

import { colors } from "@mui/material";

import { type Player } from "../../../domains/player";
import availableColors from "../../../utils/availableColors";

const migrateColors = (state: { players: Record<string, Player> }) => {
  state.players = Object.fromEntries(
    Object.entries(state.players).map(([id, player]) => {
      const color = availableColors.find(
        (availableColor) =>
          colors[availableColor][500].toLowerCase() ===
          player.color?.toLowerCase(),
      );

      if (color) {
        return [
          id,
          {
            ...player,
            color,
          },
        ];
      }

      return [id, player];
    }),
  );

  return state;
};

export default migrateColors;
