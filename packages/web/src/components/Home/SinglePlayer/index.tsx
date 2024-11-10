import { Box, IconButton } from "@mui/material";
import { useCallback } from "react";
import { FormattedNumber, useIntl } from "react-intl";

import { setCombatPlayerBonus } from "../../../ducks/combat/actions";
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from "../../../ducks/players";
import usePresentSelector from "../../../hooks/usePresentSelector";
import { useAppDispatch } from "../../../store";
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from "../../../utils/levelLimit";
import Counter, { counterMessages } from "../../Counter";
import CounterLabel from "../../Counter/Label";
import SexIcon from "../../SexIcon";

const SinglePlayer = () => {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const player = usePresentSelector(
    (state) => state.players[state.settings.singleModePlayerId as string],
  );
  const bonus = usePresentSelector((state) => state.combat.playerBonus);

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

  const onBonusDecrement = useCallback(
    () =>
      dispatch((_, getState) =>
        dispatch(
          setCombatPlayerBonus(getState().present.combat.playerBonus - 1),
        ),
      ),
    [dispatch],
  );

  const onBonusIncrement = useCallback(
    () =>
      dispatch((_, getState) =>
        dispatch(
          setCombatPlayerBonus(getState().present.combat.playerBonus + 1),
        ),
      ),
    [dispatch],
  );

  const onLevelDecrement = useCallback(
    () => dispatch(decrementPlayerLevel(player.id)),
    [dispatch, player.id],
  );

  const onLevelIncrement = useCallback(
    () => dispatch(incrementPlayerLevel(player.id)),
    [dispatch, player.id],
  );

  const onGearDecrement = useCallback(
    () => dispatch(decrementPlayerGear(player.id)),
    [dispatch, player.id],
  );

  const onGearIncrement = useCallback(
    () => dispatch(incrementPlayerGear(player.id)),
    [dispatch, player.id],
  );

  const onSexToggle = useCallback(
    () => dispatch(togglePlayerSex(player.id)),
    [dispatch, player.id],
  );

  const counterSx = {
    flex: 1,
    overflow: "hidden",
  };

  return (
    <Box
      sx={{
        alignSelf: "center",
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Box
        sx={[
          (theme) => ({
            display: "grid",
            flex: 1,
            flexDirection: "column-reverse",
            gap: theme.spacing(2, 6),
            gridTemplateAreas: `
              "strength strength"
              "level gear"
              "modifier modifier"
          `,
            width: "fit-content",
          }),
          {
            "@media (orientation: landscape)": {
              gridTemplateAreas: `
                "level gear modifier strength"
              `,
            },
          },
        ]}
      >
        <Counter
          data-screenshots="level-counter"
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={onLevelDecrement}
          onIncrement={onLevelIncrement}
          sx={[
            counterSx,
            {
              gridArea: "level",
            },
          ]}
          title={intl.formatMessage(counterMessages.level)}
          value={player.level}
        />
        <Counter
          data-screenshots="gear-counter"
          onDecrement={onGearDecrement}
          onIncrement={onGearIncrement}
          sx={[
            counterSx,
            {
              gridArea: "gear",
            },
          ]}
          title={intl.formatMessage(counterMessages.gear)}
          value={player.gear}
        />
        <Counter
          data-screenshots="modifier-counter"
          onDecrement={onBonusDecrement}
          onIncrement={onBonusIncrement}
          sx={[
            counterSx,
            {
              gridArea: "modifier",
            },
          ]}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gridArea: "strength",
            justifyContent: "center",
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
                color: "text.primary",
                fontFamily: `Munchkin, ${String(theme.typography.fontFamily)}`,
                fontSize: "2.25rem",
              }),
              (theme) => ({
                "@media (orientation: portrait)": {
                  ...theme.typography.h1,
                  fontFamily: `Munchkin, ${String(theme.typography.fontFamily)}`,
                },
              }),
            ]}
          >
            <FormattedNumber value={player.level + player.gear + bonus} />
          </Box>

          <IconButton
            onClick={onSexToggle}
            sx={[
              {
                fontSize: "2rem",
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
    </Box>
  );
};

export default SinglePlayer;
