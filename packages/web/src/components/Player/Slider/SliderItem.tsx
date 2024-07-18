import { Box, type BoxProps, Typography } from "@mui/material";
import { type FC } from "react";

import { type Player } from "../../../domains/player";
import usePresentSelector from "../../../hooks/usePresentSelector";

import PlayerStats from "./Stats";

type SliderItemProps = {
  playerId: Player["id"];
} & BoxProps;

export const SliderItem: FC<SliderItemProps> = (props) => {
  const { playerId, sx = [], ...rest } = props;
  const name = usePresentSelector((state) => state.players[playerId].name);

  return (
    <Box
      sx={[
        (theme) => ({
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          justifyContent: "center",
          padding: theme.spacing(2, 2, 10),
        }),
        ...(sx instanceof Array ? sx : [sx]),
      ]}
      {...rest}
    >
      <Typography
        component="span"
        noWrap
        sx={{
          textAlign: "center",
        }}
        variant="h5"
      >
        {name}
      </Typography>
      <PlayerStats playerId={playerId} />
    </Box>
  );
};
