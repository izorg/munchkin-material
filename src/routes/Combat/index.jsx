import { makeStyles, Typography, useTheme } from "@material-ui/core";
import clsx from "clsx";
import { useSelector } from "react-redux";

import AppBar from "./AppBar";
import HelperButton from "./HelperButton";
import HelperSelector from "./HelperSelector";
import MonsterSlider from "./MonsterSlider";
import PlayerSlider from "./PlayerSlider";

const displayName = "Combat";

const useStyles = makeStyles(
  /* eslint-disable sort-keys */
  (theme) => ({
    root: {
      backgroundColor: theme.palette.background.default,
      display: "flex",
      flex: 1,
      flexDirection: "column",
      overflow: "hidden",
      zIndex: 1,
    },

    content: {
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
        paddingBottom: theme.spacing(7),
      },

      "@media (orientation: landscape)": {
        flexDirection: "row",
        overflow: "hidden",
      },
    },

    players: {
      "@media (orientation: landscape)": {
        flex: 1,
      },
    },

    monsters: {
      "@media (orientation: landscape)": {
        flex: 1,
      },
    },

    total: {
      textAlign: "center",
    },

    value: {
      display: "inline-block",
      fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
      fontSize: "inherit",
      minWidth: 50,
    },

    combinedPlayerStrength: {
      textAlign: "right",
    },

    combinedMonsterStrength: {
      textAlign: "left",
    },

    versus: {
      margin: theme.spacing(0, 0.5),
    },
  }),
  /* eslint-enable */
  { name: displayName }
);

const Combat = () => {
  const classes = useStyles();
  const { direction } = useTheme();

  const playerId = useSelector((state) => state.present.combat.playerId);
  const helperId = useSelector((state) => state.present.combat.helperId);

  const combinedMonsterStrength = useSelector((state) => {
    const { combat, monsters } = state.present;

    return combat.monsters
      .map((id) => monsters[id])
      .reduce(
        (strength, monster) => strength + monster.level + monster.bonus,
        0
      );
  });

  const combinedPlayerStrength = useSelector((state) => {
    const {
      combat: { helperBonus, helperId, playerBonus, playerId },
      players,
    } = state.present;

    const player = players[playerId];
    const helper = players[helperId];

    const playerStrength = player.level + player.gear + playerBonus;
    const helperStrength = helper
      ? helper.level + helper.gear + helperBonus
      : 0;

    return playerStrength + helperStrength;
  });

  return (
    <>
      <div className={classes.root}>
        <AppBar />
        <div className={classes.content}>
          <PlayerSlider
            className={classes.players}
            helperId={helperId}
            playerId={playerId}
          />

          <Typography className={classes.total} component="div" variant="h4">
            <sup
              className={clsx(classes.value, classes.combinedPlayerStrength)}
            >
              {combinedPlayerStrength}
            </sup>
            <span className={classes.versus}>
              {direction === "rtl" ? "\\" : "/"}
            </span>
            <sub
              className={clsx(classes.value, classes.combinedMonsterStrength)}
            >
              {combinedMonsterStrength}
            </sub>
          </Typography>

          <MonsterSlider className={classes.monsters} />
        </div>
      </div>

      <HelperButton />

      <HelperSelector />
    </>
  );
};

Combat.displayName = displayName;

export default Combat;
