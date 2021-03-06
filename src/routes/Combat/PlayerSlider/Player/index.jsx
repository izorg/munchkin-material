import { css } from "@emotion/react";
import { IconButton, Typography, useTheme } from "@material-ui/core";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

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
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from "../../../../utils/levelLimit";
import Counter from "../../Counter";

const displayName = "CombatPlayer";

const CombatPlayer = ({ playerId }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const players = useSelector((state) => state.present.players);
  const { gear, id, level, name, sex } = players[playerId];

  const levelLimit = useSelector((state) => state.present.settings.levelLimit);
  const epic = useSelector((state) => state.present.settings.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(level, levelLimit);
  const levelIncrementDisabled = isLevelIncrementDisabled(
    level,
    levelLimit,
    epic
  );

  const combat = useSelector((state) => state.present.combat);
  const bonus =
    playerId === combat.helperId ? combat.helperBonus : combat.playerBonus;

  const onBonusChange = useCallback(
    (value) => {
      dispatch((_, getState) => {
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

CombatPlayer.displayName = displayName;

export default CombatPlayer;
