import { css } from "@emotion/react";
import { IconButton, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { type Action } from "redux";

import { counterMessages } from "../../../../components/Counter";
import SexIcon from "../../../../components/Sex";
import {
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from "../../../../ducks/combat";
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from "../../../../ducks/players";
import { type StoreState } from "../../../../store";
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from "../../../../utils/levelLimit";
import usePresentSelector from "../../../../utils/usePresentSelector";
import Counter from "../../Counter";

type CombatPlayerProps = {
  playerId: string;
};

const CombatPlayer = ({ playerId }: CombatPlayerProps) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const players = usePresentSelector((state) => state.players);
  const { gear, id, level, name, sex } = players[playerId];

  const levelLimit = usePresentSelector((state) => state.settings.levelLimit);
  const epic = usePresentSelector((state) => state.settings.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(level, levelLimit);
  const levelIncrementDisabled = isLevelIncrementDisabled(
    level,
    levelLimit,
    epic
  );

  const combat = usePresentSelector((state) => state.combat);
  const bonus =
    playerId === combat.helperId ? combat.helperBonus : combat.playerBonus;

  const onBonusChange = useCallback(
    (value: number) => {
      dispatch((_: Action, getState: () => StoreState) => {
        const {
          combat: { helperBonus, helperId, playerBonus },
        } = getState().present;

        const currentBonus = playerId === helperId ? helperBonus : playerBonus;

        dispatch(
          playerId === helperId
            ? setCombatHelperBonus(currentBonus + value)
            : setCombatPlayerBonus(currentBonus + value)
        );
      });
    },
    [dispatch, playerId]
  );

  const onBonusDecrement = useCallback(
    () => onBonusChange(-1),
    [onBonusChange]
  );
  const onBonusIncrement = useCallback(() => onBonusChange(1), [onBonusChange]);

  const onPlayerLevelDecrement = useCallback(
    () => dispatch(decrementPlayerLevel(id)),
    [dispatch, id]
  );

  const onPlayerLevelIncrement = useCallback(
    () => dispatch(incrementPlayerLevel(id)),
    [dispatch, id]
  );

  const onPlayerGearDecrement = useCallback(
    () => dispatch(decrementPlayerGear(id)),
    [dispatch, id]
  );

  const onPlayerGearIncrement = useCallback(
    () => dispatch(incrementPlayerGear(id)),
    [dispatch, id]
  );

  const itemCss = css`
    flex: 1;
    overflow: hidden;
  `;

  return (
    <div
      css={css`
        padding: ${theme.spacing(1)};
        position: relative;
        text-align: center;
      `}
    >
      <Typography
        align="center"
        component="div"
        css={css`
          margin: 0 0 16px;
          padding: 0 24px;
        `}
        noWrap
      >
        {name}
      </Typography>

      <IconButton
        css={css`
          left: 0;
          padding: 6px;
          position: absolute;
          top: 0;
        `}
        onClick={() => dispatch(togglePlayerSex(id))}
      >
        <SexIcon sex={sex} />
      </IconButton>

      <div
        css={css`
          display: flex;
          margin: 0 auto;
          max-width: 420px;
        `}
      >
        <Counter
          css={itemCss}
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={onPlayerLevelDecrement}
          onIncrement={onPlayerLevelIncrement}
          title={intl.formatMessage(counterMessages.level)}
          value={level}
        />
        <Counter
          css={itemCss}
          onDecrement={onPlayerGearDecrement}
          onIncrement={onPlayerGearIncrement}
          title={intl.formatMessage(counterMessages.gear)}
          value={gear}
        />
        <Counter
          css={itemCss}
          onDecrement={onBonusDecrement}
          onIncrement={onBonusIncrement}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </div>
    </div>
  );
};

CombatPlayer.propTypes = {
  playerId: PropTypes.string.isRequired,
};

export default CombatPlayer;
