import { Box, IconButton, Typography } from "@mui/material";
import { type FC, useCallback } from "react";
import { useIntl } from "react-intl";

import {
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from "../../../../ducks/combat/actions";
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
import { counterMessages } from "../../../Counter";
import SexIcon from "../../../SexIcon";
import Counter from "../../Counter";

type CombatPlayerProps = {
  playerId: string;
};

const CombatPlayer: FC<CombatPlayerProps> = ({ playerId }) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const players = usePresentSelector((state) => state.players);
  const { gear, id, level, name, sex } = players[playerId];

  const levelLimit = usePresentSelector((state) => state.settings.levelLimit);
  const epic = usePresentSelector((state) => state.settings.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(level, levelLimit);
  const levelIncrementDisabled = isLevelIncrementDisabled(
    level,
    levelLimit,
    epic,
  );

  const combat = usePresentSelector((state) => state.combat);
  const bonus =
    playerId === combat.helperId ? combat.helperBonus : combat.playerBonus;

  const onBonusChange = useCallback(
    (value: number) => {
      dispatch((_, getState) => {
        const {
          combat: { helperBonus, helperId, playerBonus },
        } = getState().present;

        const currentBonus = playerId === helperId ? helperBonus : playerBonus;

        dispatch(
          playerId === helperId
            ? setCombatHelperBonus(currentBonus + value)
            : setCombatPlayerBonus(currentBonus + value),
        );
      });
    },
    [dispatch, playerId],
  );

  const onBonusDecrement = useCallback(
    () => onBonusChange(-1),
    [onBonusChange],
  );
  const onBonusIncrement = useCallback(() => onBonusChange(1), [onBonusChange]);

  const onPlayerLevelDecrement = useCallback(
    () => dispatch(decrementPlayerLevel(id)),
    [dispatch, id],
  );

  const onPlayerLevelIncrement = useCallback(
    () => dispatch(incrementPlayerLevel(id)),
    [dispatch, id],
  );

  const onPlayerGearDecrement = useCallback(
    () => dispatch(decrementPlayerGear(id)),
    [dispatch, id],
  );

  const onPlayerGearIncrement = useCallback(
    () => dispatch(incrementPlayerGear(id)),
    [dispatch, id],
  );

  const itemSx = {
    flex: 1,
    overflow: "hidden",
  };

  return (
    <Box
      sx={{
        padding: 1,
        position: "relative",
        textAlign: "center",
      }}
    >
      <Typography
        align="center"
        component="div"
        noWrap
        sx={{
          margin: "0 0 16px",
          padding: "0 24px",
        }}
      >
        {name}
      </Typography>

      <IconButton
        onClick={() => dispatch(togglePlayerSex(id))}
        sx={{
          left: 0,
          padding: "6px",
          position: "absolute",
          top: 0,
        }}
      >
        <SexIcon sex={sex} />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          margin: "0 auto",
          maxWidth: "420px",
        }}
      >
        <Counter
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={onPlayerLevelDecrement}
          onIncrement={onPlayerLevelIncrement}
          sx={itemSx}
          title={intl.formatMessage(counterMessages.level)}
          value={level}
        />
        <Counter
          onDecrement={onPlayerGearDecrement}
          onIncrement={onPlayerGearIncrement}
          sx={itemSx}
          title={intl.formatMessage(counterMessages.gear)}
          value={gear}
        />
        <Counter
          onDecrement={onBonusDecrement}
          onIncrement={onBonusIncrement}
          sx={itemSx}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </Box>
    </Box>
  );
};

export default CombatPlayer;
