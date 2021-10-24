import { css } from "@emotion/react";
import { IconButton, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";

import Counter, { counterMessages } from "../../../../components/Counter";
import CounterLabel from "../../../../components/Counter/Label";
import SexIcon from "../../../../components/Sex";
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
import usePresentSelector from "../../../../utils/usePresentSelector";

type PlayerStatsProps = {
  className?: string;
  playerId: string;
};

const PlayerStats = ({
  className,
  playerId,
}: PlayerStatsProps): JSX.Element => {
  const dispatch = useDispatch();
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

  const counterContainerCss = css`
    display: flex;
    flex: 1 1 50%;
    flex-direction: column;
    justify-content: center;
  `;

  const lineHeight =
    (theme.typography.body2.lineHeight as number) / 2; /* 1.43 / 2 */

  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: column-reverse;
        width: 100%;

        @media (orientation: landscape) {
          flex-direction: row;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex: 1;

          @media (orientation: landscape) {
            flex: 2;
          }
        `}
      >
        <div css={counterContainerCss}>
          <Counter
            decrementDisabled={levelDecrementDisabled}
            incrementDisabled={levelIncrementDisabled}
            onDecrement={onLevelDecrement}
            onIncrement={onLevelIncrement}
            title={intl.formatMessage(counterMessages.level)}
            value={player.level}
          />
        </div>
        <div css={counterContainerCss}>
          <Counter
            onDecrement={onGearDecrement}
            onIncrement={onGearIncrement}
            title={intl.formatMessage(counterMessages.gear)}
            value={player.gear}
          />
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <div
          css={css`
            text-align: center;
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
              font-family: Munchkin, ${theme.typography.fontFamily};
              font-size: 36px;

              @media (orientation: portrait) {
                font-size: 72px; /* 36px * 2 */
                line-height: ${lineHeight}; /* 1.43 / 2 */
                margin-top: 32px;
              }
            `}
          >
            {player.level + player.gear}
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
    </div>
  );
};

PlayerStats.propTypes = {
  className: PropTypes.string,
  playerId: PropTypes.string.isRequired,
};

export default PlayerStats;
