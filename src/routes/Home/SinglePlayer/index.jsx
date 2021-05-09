import { css } from "@emotion/react";
import { IconButton, useTheme } from "@material-ui/core";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import Counter, { counterMessages } from "../../../components/Counter";
import CounterLabel from "../../../components/Counter/Label";
import SexIcon from "../../../components/Sex";
import { setCombatPlayerBonus } from "../../../ducks/combat";
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from "../../../ducks/players";
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from "../../../utils/levelLimit";

const SinglePlayer = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const player = useSelector(
    (state) => state.present.players[state.present.settings.singleModePlayerId]
  );
  const bonus = useSelector((state) => state.present.combat.playerBonus);

  const levelLimit = useSelector((state) => state.present.settings.levelLimit);
  const epic = useSelector((state) => state.present.settings.epic);

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

  const counterCss = css`
    flex: 1;
    overflow: hidden;
  `;

  return (
    <div
      css={css`
        align-self: center;
        display: flex;
        flex: 1;
        flex-direction: column-reverse;
        height: 100%;
        margin: 0 auto;
        max-height: 600px;
        max-width: 800px;

        @media (orientation: landscape) {
          flex-direction: row;
        }
      `}
    >
      <div
        css={css`
          align-items: center;
          display: flex;
          flex: 1;

          @media (orientation: landscape) {
            flex: 3;
          }
        `}
      >
        <Counter
          css={counterCss}
          data-screenshots="level-counter"
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={onLevelDecrement}
          onIncrement={onLevelIncrement}
          title={intl.formatMessage(counterMessages.level)}
          value={player.level}
        />
        <Counter
          css={counterCss}
          data-screenshots="gear-counter"
          onDecrement={onGearDecrement}
          onIncrement={onGearIncrement}
          title={intl.formatMessage(counterMessages.gear)}
          value={player.gear}
        />
        <Counter
          css={counterCss}
          data-screenshots="modifier-counter"
          onDecrement={onBonusDecrement}
          onIncrement={onBonusIncrement}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </div>
      <div
        css={css`
          align-items: center;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <CounterLabel
          css={css`
            font-size: 24px;
          `}
        >
          {intl.formatMessage(counterMessages.strength)}
        </CounterLabel>

        <div
          css={css`
            color: ${theme.palette.text.primary};
            font-family: "Munchkin", ${theme.typography.fontFamily};
            font-size: 36px;

            @media (orientation: portrait) {
              font-size: 72px; /* 36px * 2 */
              line-height: ${theme.typography.body2.lineHeight /
              2}; /* 1.43 / 2 */

              margin-top: 32px;
            }
          `}
        >
          {player.level + player.gear + bonus}
        </div>

        <IconButton
          css={css`
            font-size: 32px;
            padding: 8px;

            @media (orientation: portrait) {
              margin-top: 16px;
            }
          `}
          onClick={onSexToggle}
        >
          <SexIcon
            css={css`
              font-size: inherit;
            `}
            sex={player.sex}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default SinglePlayer;
