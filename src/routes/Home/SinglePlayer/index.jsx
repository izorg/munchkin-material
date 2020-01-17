import { IconButton, makeStyles } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import Counter, { counterMessages } from '../../../components/Counter';
import CounterLabel from '../../../components/Counter/Label';
import Sex from '../../../components/Sex';
import { setCombatPlayerBonus } from '../../../ducks/combat';
import { togglePlayerSex, updatePlayer } from '../../../ducks/players';
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from '../../../utils/levelLimit';

const useStyles = makeStyles(
  (theme) => ({
    content: {
      alignSelf: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'column-reverse',
      height: '100%',
      margin: '0 auto',
      maxHeight: 600,
      maxWidth: 800,

      '@media (orientation: landscape)': {
        flexDirection: 'row',
      },
    },

    counters: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,

      '@media (orientation: landscape)': {
        flex: 2,
      },
    },

    counter: {
      flex: 1,
      overflow: 'hidden',
    },

    strengthCounter: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
    },

    strengthTitle: {
      fontSize: 24,
    },

    strengthValue: {
      color: theme.palette.text.primary,
      fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
      fontSize: 72, // 36px * 2
      lineHeight: theme.typography.body2.lineHeight / 2, // 1.43 / 2
      marginTop: 32,

      '@media (orientation: landscape)': {
        marginTop: 64,
      },
    },

    sex: {
      fontSize: 36,
      height: 64,
      padding: 12,
      width: 64,
    },

    sexIcon: {
      fontSize: 'inherit',
    },
  }),
  { name: 'SinglePlayer' },
);

const SinglePlayer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const player = useSelector(
    (state) => state.players[state.app.singleModePlayerId],
  );
  const bonus = useSelector((state) => state.combat.playerBonus);

  const levelLimit = useSelector((state) => state.app.levelLimit);
  const epic = useSelector((state) => state.app.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(
    player.level,
    levelLimit,
  );
  const levelIncrementDisabled = isLevelIncrementDisabled(
    player.level,
    levelLimit,
    epic,
  );

  const onBonusDecrement = () => dispatch(setCombatPlayerBonus(bonus - 1));

  const onBonusIncrement = () => dispatch(setCombatPlayerBonus(bonus + 1));

  const onGearDecrement = () =>
    dispatch(
      updatePlayer({
        ...player,
        gear: player.gear - 1,
      }),
    );

  const onGearIncrement = () =>
    dispatch(
      updatePlayer({
        ...player,
        gear: player.gear + 1,
      }),
    );

  const onLevelDecrement = () =>
    dispatch(
      updatePlayer({
        ...player,
        level: player.level - 1,
      }),
    );

  const onLevelIncrement = () =>
    dispatch(
      updatePlayer({
        ...player,
        level: player.level + 1,
      }),
    );

  const onSexToggle = () => dispatch(togglePlayerSex(player.id));

  return (
    <div className={classes.content}>
      <div className={classes.counters}>
        <Counter
          className={classes.counter}
          data-screenshots="level-counter"
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={onLevelDecrement}
          onIncrement={onLevelIncrement}
          title={intl.formatMessage(counterMessages.level)}
          value={player.level}
        />
        <Counter
          className={classes.counter}
          data-screenshots="gear-counter"
          onDecrement={onGearDecrement}
          onIncrement={onGearIncrement}
          title={intl.formatMessage(counterMessages.gear)}
          value={player.gear}
        />
        <Counter
          className={classes.counter}
          data-screenshots="modifier-counter"
          onDecrement={onBonusDecrement}
          onIncrement={onBonusIncrement}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </div>
      <div className={classes.strengthCounter}>
        <CounterLabel className={classes.strengthTitle}>
          {intl.formatMessage(counterMessages.strength)}
        </CounterLabel>

        <div className={classes.strengthValue}>
          {player.level + player.gear + bonus}
        </div>

        <IconButton className={classes.sex} onClick={onSexToggle}>
          <Sex className={classes.sexIcon} sex={player.sex} />
        </IconButton>
      </div>
    </div>
  );
};

SinglePlayer.displayName = 'SinglePlayer';

export default SinglePlayer;
