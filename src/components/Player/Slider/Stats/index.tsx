import { Box, type BoxProps, IconButton, useTheme } from "@mui/material";
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

type PlayerStatsProps = BoxProps & {
  playerId: string;
};

const PlayerStats: FC<PlayerStatsProps> = ({ playerId, sx = [], ...props }) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const player = usePresentSelector((state) => state.players[playerId]);
  const levelLimit = usePresentSelector((state) => state.settings.levelLimit);
  const epic = usePresentSelector((state) => state.settings.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(
    player.level,
    levelLimit
  );

  const levelIncrementDisabled = isLevelIncrementDisabled(
    player.level,
    levelLimit,
    epic
  );

  const onGearDecrement = useCallback(
    () => dispatch(decrementPlayerGear(playerId)),
    [dispatch, playerId]
  );
  const onGearIncrement = useCallback(
    () => dispatch(incrementPlayerGear(playerId)),
    [dispatch, playerId]
  );
  const onLevelDecrement = useCallback(
    () => dispatch(decrementPlayerLevel(playerId)),
    [dispatch, playerId]
  );
  const onLevelIncrement = useCallback(
    () => dispatch(incrementPlayerLevel(playerId)),
    [dispatch, playerId]
  );
  const onSexToggle = useCallback(
    () => dispatch(togglePlayerSex(playerId)),
    [dispatch, playerId]
  );

  const lineHeight =
    (theme.typography.body2.lineHeight as number) / 2; /* 1.43 / 2 */

  return (
    <Box
      {...props}
      sx={[
        {
          display: "flex",
          flexDirection: "column-reverse",
          width: "100%",

          // eslint-disable-next-line sort-keys
          "@media (orientation: landscape)": {
            flexDirection: "row",
          },
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,

          // eslint-disable-next-line sort-keys
          "@media (orientation: landscape)": {
            flex: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1 1 50%",
            flexDirection: "column",
            justifyContent: "center",
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
            flex: "1 1 50%",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Counter
            onDecrement={onGearDecrement}
            onIncrement={onGearIncrement}
            title={intl.formatMessage(counterMessages.gear)}
            value={player.gear}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <CounterLabel
            sx={{
              fontSize: "24px",
            }}
          >
            {intl.formatMessage(counterMessages.strength)}
          </CounterLabel>

          <Box
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontFamily: `Munchkin, ${theme.typography.fontFamily || ""}`,
              fontSize: "36px",

              // eslint-disable-next-line sort-keys
              "@media (orientation: portrait)": {
                fontSize: "72px" /* 36px * 2 */,
                lineHeight: lineHeight /* 1.43 / 2 */,
                marginTop: "32px",
              },
            })}
          >
            {player.level + player.gear}
          </Box>

          <IconButton
            onClick={onSexToggle}
            sx={{
              fontSize: "32px",
              padding: "8px",

              // eslint-disable-next-line sort-keys
              "@media (orientation: portrait)": {
                marginTop: "16px",
              },
            }}
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
    </Box>
  );
};

PlayerStats.propTypes = {
  className: PropTypes.string,
  playerId: PropTypes.string.isRequired,
};

export default PlayerStats;
