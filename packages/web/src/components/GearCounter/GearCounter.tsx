import {
  mdiMenuDown as decrementIcon,
  mdiMenuUp as incrementIcon,
} from "@mdi/js";
import { Box, type BoxProps, IconButton, SvgIcon } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { type Player } from "../../domains/player";
import { decrementPlayerGear, incrementPlayerGear } from "../../ducks/players";
import { useAppDispatch } from "../../store";
import CounterLabel from "../Counter/Label";

type GearCounterProps = {
  player: Player;
} & BoxProps;

export const GearCounter = ({
  player,
  sx = [],
  ...props
}: GearCounterProps) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={[
        {
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
      {...props}
    >
      <CounterLabel
        sx={{
          fontSize: "1.5rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        <FormattedMessage defaultMessage="Gear" id="8nh9JU" />
      </CounterLabel>

      <Box
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontFamily: `Munchkin, ${String(theme.typography.fontFamily)}`,
          fontSize: "2.25rem",
        })}
      >
        {player.gear}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "120px",
          width: "100%",
        }}
      >
        <IconButton
          data-screenshots="decrement-button"
          onClick={() => {
            dispatch(decrementPlayerGear(player.id));
          }}
          sx={{
            fontSize: "3rem",
            padding: 0,
          }}
        >
          <SvgIcon
            sx={{
              fontSize: "inherit",
            }}
          >
            <path d={decrementIcon} />
          </SvgIcon>
        </IconButton>

        <IconButton
          data-screenshots="increment-button"
          onClick={() => {
            dispatch(incrementPlayerGear(player.id));
          }}
          sx={{
            fontSize: "3rem",
            padding: 0,
          }}
        >
          <SvgIcon
            sx={{
              fontSize: "inherit",
            }}
          >
            <path d={incrementIcon} />
          </SvgIcon>
        </IconButton>
      </Box>
    </Box>
  );
};
