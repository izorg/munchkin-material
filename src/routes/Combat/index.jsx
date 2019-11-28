import { makeStyles, Typography, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';

import AppBar from './AppBar';
import HelperButton from './HelperButton';
import HelperSelector from './HelperSelector';
import MonsterSlider from './MonsterSlider';
import PlayerSlider from './PlayerSlider';

const displayName = 'Combat';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 1,
    },

    content: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      padding: 0,

      '@supports (padding: env(safe-area-inset-left))': {
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      },

      '@media (orientation: portrait)': {
        overflowY: 'auto',
      },

      '@media (orientation: landscape)': {
        flexDirection: 'row',
        overflow: 'hidden',
      },

      [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
        justifyContent: 'center',
      },
    },

    players: {
      flex: 1,

      [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
        flex: 'none',
      },
    },

    monsters: {
      flex: 1,

      [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
        flex: 'none',
      },
    },

    total: {
      alignSelf: 'center',
      padding: theme.spacing(1),
      textAlign: 'center',
    },

    value: {
      display: 'inline-block',
      fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
      fontSize: 'inherit',
      minWidth: 50,
    },

    combinedPlayerStrength: {
      textAlign: 'right',
    },

    combinedMonsterStrength: {
      textAlign: 'left',
    },

    versus: {
      margin: theme.spacing(0, 0.5),
    },
  }),
  { name: displayName },
);

const combatSelector = (state) => {
  const {
    helperBonus,
    helperId,
    monsters,
    playerBonus,
    playerId,
  } = state.combat;

  const player = state.players[playerId];
  const helper = state.players[helperId];

  const playerStrength = player.level + player.gear + playerBonus;
  const helperStrength = helper ? helper.level + helper.gear + helperBonus : 0;

  const combinedMonsterStrength = monsters
    .map((id) => state.monsters[id])
    .reduce((strength, monster) => strength + monster.level + monster.bonus, 0);

  return {
    combinedMonsterStrength,
    combinedPlayerStrength: playerStrength + helperStrength,
    helperId,
    playerId,
  };
};

const Combat = () => {
  const classes = useStyles();
  const { direction } = useTheme();

  const {
    combinedMonsterStrength,
    combinedPlayerStrength,
    helperId,
    playerId,
  } = useSelector(combatSelector);

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
              {direction === 'rtl' ? '\\' : '/'}
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

export default hot(Combat);
