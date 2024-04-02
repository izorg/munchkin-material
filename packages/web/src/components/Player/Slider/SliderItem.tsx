import { Box, type BoxProps, Typography } from "@mui/material";
import { type FC } from "react";

import usePresentSelector from "../../../hooks/usePresentSelector";
import { type Player } from "../../../utils/types";

import PlayerStats from "./Stats";

type SliderItemProps = BoxProps & {
  playerId: Player["id"];
};

export const SliderItem: FC<SliderItemProps> = (props) => {
  const { playerId, sx = [], ...rest } = props;
  const name = usePresentSelector((state) => state.players[playerId].name);

  return (
    <Box
      sx={[
        (theme) => ({
          alignItems: "center",
          display: "flex",
          padding: theme.spacing(2, 2, 10),
        }),
        {
          "@media (min-height: 720px)": {
            paddingBottom: 2,
          },
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
      {...rest}
    >
      <Box
        sx={{
          flexGrow: 1,
          margin: "0 auto",
          maxHeight: "600px",
          maxWidth: "600px",
          overflow: "hidden",
        }}
      >
        <Typography
          component="span"
          noWrap
          sx={{
            display: "block",
            marginBottom: 4,
            textAlign: "center",
          }}
          variant="h5"
        >
          {name}
        </Typography>
        <PlayerStats playerId={playerId} />
      </Box>
    </Box>
  );
};
