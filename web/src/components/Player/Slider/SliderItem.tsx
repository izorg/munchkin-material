import { Box, type SxProps } from "@mui/material";
import { type FC } from "react";

import { type Player } from "../../../utils/types";

import PlayerStats from "./Stats";

type SliderItemProps = {
  playerId: Player["id"];
  sx?: SxProps;
};

export const SliderItem: FC<SliderItemProps> = ({ playerId, sx = [] }) => (
  <Box
    sx={[
      (theme) => ({
        alignItems: "center",
        display: "flex",
        padding: theme.spacing(2, 2, 7),

        // eslint-disable-next-line sort-keys
        "@media (min-height: 720px)": {
          paddingBottom: 2,
        },
      }),
      ...(sx instanceof Array ? sx : [sx]),
    ]}
  >
    <PlayerStats
      playerId={playerId}
      sx={{
        flexGrow: 1,
        margin: "0 auto",
        maxHeight: "600px",
        maxWidth: "600px",
      }}
    />
  </Box>
);
