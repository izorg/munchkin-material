import {
  Box,
  type SxProps,
  type Theme,
  Typography,
  useTheme,
} from "@mui/material";

import usePresentSelector from "../../hooks/usePresentSelector";

import AppBar from "./AppBar";
import HelperButton from "./HelperButton";
import HelperSelector from "./HelperSelector";
import MonsterSlider from "./MonsterSlider";
import PlayerSlider from "./PlayerSlider";

const valueSx: SxProps<Theme> = (theme) => ({
  display: "inline-block",
  fontFamily: `Munchkin, ${String(theme.typography.fontFamily)}`,
  fontSize: "inherit",
  minWidth: "50px",
});

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

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <AppBar />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",

            "@supports (padding: env(safe-area-inset-left))": {
              paddingLeft: "env(safe-area-inset-left)",
              paddingRight: "env(safe-area-inset-right)",
            },

            "@media (orientation: portrait)": {
              overflowY: "auto",
              paddingBottom: 7,
            },

            "@media (orientation: landscape)": {
              flexDirection: "row",
              overflow: "hidden",
            },
          }}
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
            <Box
              component="sup"
              sx={[
                valueSx,
                {
                  textAlign: "right",
                },
              ]}
            >
              {combinedPlayerStrength}
            </Box>
            <Box
              component="span"
              sx={(theme) => ({
                margin: `${theme.spacing(0, 0.5)}`,
              })}
            >
              {direction === "rtl" ? "\\" : "/"}
            </Box>
            <Box
              component="sub"
              sx={[
                valueSx,
                {
                  textAlign: "left",
                },
              ]}
            >
              {combinedMonsterStrength}
            </Box>
          </Typography>

          <MonsterSlider
            sx={{
              "@media (orientation: landscape)": {
                flex: 1,
              },
            }}
          />
        </Box>
      </Box>

      <HelperButton />

      <HelperSelector />
    </>
  );
};

export default Combat;
