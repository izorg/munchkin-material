import { css } from "@emotion/react";
import { Typography, useTheme } from "@mui/material";

import usePresentSelector from "../../hooks/usePresentSelector";

import AppBar from "./AppBar";
import HelperButton from "./HelperButton";
import HelperSelector from "./HelperSelector";
import MonsterSlider from "./MonsterSlider";
import PlayerSlider from "./PlayerSlider";

const Combat = () => {
  const theme = useTheme();

  const { direction } = theme;

  const playerId = usePresentSelector((state) => state.combat.playerId);
  const helperId = usePresentSelector((state) => state.combat.helperId);

  const combinedMonsterStrength = usePresentSelector((state) => {
    const { combat, monsters } = state;

    return combat.monsters
      .map((id) => monsters[id])
      .reduce(
        (strength, monster) => strength + monster.level + monster.bonus,
        0
      );
  });

  const combinedPlayerStrength = usePresentSelector((state) => {
    const {
      combat: { helperBonus, helperId, playerBonus, playerId },
      players,
    } = state;

    const player = players[playerId as string];
    const helper = players[helperId as string];

    const playerStrength = player.level + player.gear + playerBonus;
    const helperStrength = helper
      ? helper.level + helper.gear + helperBonus
      : 0;

    return playerStrength + helperStrength;
  });

  const valueCss = css`
    display: inline-block;
    font-family: Munchkin, ${theme.typography.fontFamily};
    font-size: inherit;
    min-width: 50px;
  `;

  return (
    <>
      <div
        css={css`
          background-color: ${theme.palette.background.default};
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow: hidden;
          z-index: 1;
        `}
      >
        <AppBar />
        <div
          css={css`
            align-items: center;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;

            @supports (padding: env(safe-area-inset-left)) {
              padding-left: env(safe-area-inset-left);
              padding-right: env(safe-area-inset-right);
            }

            @media (orientation: portrait) {
              overflow-y: auto;
              padding-bottom: ${theme.spacing(7)};
            }

            @media (orientation: landscape) {
              flex-direction: row;
              overflow: hidden;
            }
          `}
        >
          <PlayerSlider
            helperId={helperId}
            playerId={playerId as string}
            sx={{
              "@media (orientation: landscape)": {
                flex: 1,
              },
            }}
          />

          <Typography align="center" component="div" variant="h4">
            <sup
              css={[
                valueCss,
                css`
                  text-align: right;
                `,
              ]}
            >
              {combinedPlayerStrength}
            </sup>
            <span
              css={css`
                margin: ${theme.spacing(0, 0.5)};
              `}
            >
              {direction === "rtl" ? "\\" : "/"}
            </span>
            <sub
              css={[
                valueCss,
                css`
                  text-align: left;
                `,
              ]}
            >
              {combinedMonsterStrength}
            </sub>
          </Typography>

          <MonsterSlider
            css={css`
              @media (orientation: landscape) {
                flex: 1;
              }
            `}
          />
        </div>
      </div>

      <HelperButton />

      <HelperSelector />
    </>
  );
};

export default Combat;
