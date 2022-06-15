import { Box, IconButton } from "@mui/material";
import { useCallback } from "react";
import { useIntl } from "react-intl";

import { setCombatPlayerBonus } from "../../../ducks/combat";
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from "../../../ducks/players";
import { useAppDispatch } from "../../../store";
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from "../../../utils/levelLimit";
import usePresentSelector from "../../../utils/usePresentSelector";
import Counter, { counterMessages } from "../../Counter";
import CounterLabel from "../../Counter/Label";
import SexIcon from "../../SexIcon";

const SinglePlayer = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const player = usePresentSelector(
    (state) => state.players[state.settings.singleModePlayerId as string]
  );
  const bonus = usePresentSelector((state) => state.combat.playerBonus);

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

  const onBonusDecrement = useCallback(
    () =>
      dispatch((_, getState) =>
        dispatch(
          setCombatPlayerBonus(getState().present.combat.playerBonus - 1)
        )
      ),
    [dispatch]
  );

  const onBonusIncrement = useCallback(
    () =>
      dispatch((_, getState) =>
        dispatch(
          setCombatPlayerBonus(getState().present.combat.playerBonus + 1)
        )
      ),
    [dispatch]
  );

  const onLevelDecrement = useCallback(
    () => dispatch(decrementPlayerLevel(player.id)),
    [dispatch, player.id]
  );

  const onLevelIncrement = useCallback(
    () => dispatch(incrementPlayerLevel(player.id)),
    [dispatch, player.id]
  );

  const onGearDecrement = useCallback(
    () => dispatch(decrementPlayerGear(player.id)),
    [dispatch, player.id]
  );

  const onGearIncrement = useCallback(
    () => dispatch(incrementPlayerGear(player.id)),
    [dispatch, player.id]
  );

  const onSexToggle = useCallback(
    () => dispatch(togglePlayerSex(player.id)),
    [dispatch, player.id]
  );

  const counterSx = {
    flex: 1,
    overflow: "hidden",
  };

  return (
    <Box
      sx={{
        alignSelf: "center",
        display: "flex",
        flex: 1,
        flexDirection: "column-reverse",
        height: "100%",
        margin: "0 auto",
        maxHeight: "600px",
        maxWidth: "800px",

        // eslint-disable-next-line sort-keys
        "@media (orientation: landscape)": {
          flexDirection: "row",
        },
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flex: 1,

          // eslint-disable-next-line sort-keys
          "@media (orientation: landscape)": {
            flex: 3,
          },
        }}
      >
        <Counter
          data-screenshots="level-counter"
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={onLevelDecrement}
          onIncrement={onLevelIncrement}
          sx={counterSx}
          title={intl.formatMessage(counterMessages.level)}
          value={player.level}
        />
        <Counter
          data-screenshots="gear-counter"
          onDecrement={onGearDecrement}
          onIncrement={onGearIncrement}
          sx={counterSx}
          title={intl.formatMessage(counterMessages.gear)}
          value={player.gear}
        />
        <Counter
          data-screenshots="modifier-counter"
          onDecrement={onBonusDecrement}
          onIncrement={onBonusIncrement}
          sx={counterSx}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
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
          sx={{
            color: "text.primary",
            fontFamily: (theme) =>
              `Munchkin, ${String(theme.typography.fontFamily)}`,
            fontSize: "36px",

            // eslint-disable-next-line sort-keys
            "@media (orientation: portrait)": {
              fontSize: "72px" /* 36px * 2 */,
              lineHeight: (theme) =>
                (theme.typography.body2.lineHeight as number) /
                2 /* 1.43 / 2 */,
              marginTop: "32px",
            },
          }}
        >
          {player.level + player.gear + bonus}
        </Box>

        <IconButton
          onClick={onSexToggle}
          sx={{
            fontSize: "32px",

            // eslint-disable-next-line sort-keys
            "@media (orientation: portrait)": {
              marginTop: 2,
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
  );
};

export default SinglePlayer;
