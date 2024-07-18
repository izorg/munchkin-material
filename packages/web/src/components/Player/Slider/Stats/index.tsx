import { Box, IconButton, type SxProps, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { type FC, useCallback } from "react";
import { useIntl } from "react-intl";

import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from "../../../../ducks/players";
import usePresentSelector from "../../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../../store";
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from "../../../../utils/levelLimit";
import Counter, { counterMessages } from "../../../Counter";
import CounterLabel from "../../../Counter/Label";
import SexIcon from "../../../SexIcon";

type PlayerStatsProps = {
  playerId: string;
  sx?: SxProps;
};

const PlayerStats: FC<PlayerStatsProps> = ({ playerId, sx = [] }) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const player = usePresentSelector((state) => state.players[playerId]);
  const levelLimit = usePresentSelector((state) => state.settings.levelLimit);
  const epic = usePresentSelector((state) => state.settings.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(
    player.level,
    levelLimit,
  );

  const levelIncrementDisabled = isLevelIncrementDisabled(
    player.level,
    levelLimit,
    epic,
  );

  const onGearDecrement = useCallback(
    () => dispatch(decrementPlayerGear(playerId)),
    [dispatch, playerId],
  );
  const onGearIncrement = useCallback(
    () => dispatch(incrementPlayerGear(playerId)),
    [dispatch, playerId],
  );
  const onLevelDecrement = useCallback(
    () => dispatch(decrementPlayerLevel(playerId)),
    [dispatch, playerId],
  );
  const onLevelIncrement = useCallback(
    () => dispatch(incrementPlayerLevel(playerId)),
    [dispatch, playerId],
  );
  const onSexToggle = useCallback(
    () => dispatch(togglePlayerSex(playerId)),
    [dispatch, playerId],
  );

  const lineHeight =
    (theme.typography.body2.lineHeight as number) / 2; /* 1.43 / 2 */

  return (
    <Box
      sx={[
        (theme) => ({
          display: "grid",
          gap: theme.spacing(2, 6),
          gridTemplateAreas: `
            "strength strength"
            "level gear"
          `,
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, auto)",
          justifyItems: "center",
          width: "fit-content",
        }),
        {
          "@media (orientation: landscape)": {
            gridTemplateAreas: `
              "level gear strength"
            `,
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(1, auto)",
          },
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gridArea: "level",
        }}
      >
        <Counter
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={onLevelDecrement}
          onIncrement={onLevelIncrement}
          title={intl.formatMessage(counterMessages.level)}
          value={player.level}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gridArea: "gear",
        }}
      >
        <Counter
          onDecrement={onGearDecrement}
          onIncrement={onGearIncrement}
          title={intl.formatMessage(counterMessages.gear)}
          value={player.gear}
        />
      </Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gridArea: "strength",
        }}
      >
        <CounterLabel
          sx={{
            fontSize: "1.5rem",
          }}
        >
          {intl.formatMessage(counterMessages.strength)}
        </CounterLabel>

        <Box
          sx={[
            (theme) => ({
              color: theme.palette.text.primary,
              fontFamily: `Munchkin, ${theme.typography.fontFamily ?? ""}`,
              fontSize: "2.25rem",
            }),
            {
              "@media (orientation: portrait)": {
                fontSize: "4.5rem" /* 36px * 2 */,
                lineHeight: lineHeight /* 1.43 / 2 */,
                marginTop: "2.25rem",
              },
            },
          ]}
        >
          {player.level + player.gear}
        </Box>

        <IconButton
          onClick={onSexToggle}
          sx={[
            {
              fontSize: "2.25rem",
              padding: "8px",
            },
            {
              "@media (orientation: portrait)": {
                marginTop: "16px",
              },
            },
          ]}
        >
          <SexIcon
            sex={player.sex}
            sx={{
              fontSize: "inherit",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

PlayerStats.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default PlayerStats;
