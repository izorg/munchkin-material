import { colors } from "@mui/material";

import availableColors from "../../../utils/availableColors";
import { type Player } from "../../../utils/types";

export default (state: { players: Record<string, Player> }) => {
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
