import { IconButton, makeStyles } from '@material-ui/core';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import Counter, { counterMessages } from '../../../components/Counter';
import CounterLabel from '../../../components/Counter/Label';
import Sex from '../../../components/Sex';
import { setCombatPlayerBonus } from '../../../ducks/combat';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from '../../../ducks/players';
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from '../../../utils/levelLimit';

const displayName = 'SinglePlayer';

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
        flex: 3,
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
      fontSize: 36,

      '@media (orientation: portrait)': {
        fontSize: 72, // 36px * 2
        lineHeight: theme.typography.body2.lineHeight / 2, // 1.43 / 2
        marginTop: 32,
      },
    },

    sex: {
      fontSize: 32,
      padding: 8,

      '@media (orientation: portrait)': {
        marginTop: 16,
      },
    },

    sexIcon: {
      fontSize: 'inherit',
    },
  }),
  { name: displayName },
);

const SinglePlayer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const player = useSelector(
    (state) => state.present.players[state.present.settings.singleModePlayerId],
  );
  const bonus = useSelector((state) => state.present.combat.playerBonus);

  const levelLimit = useSelector((state) => state.present.settings.levelLimit);
  const epic = useSelector((state) => state.present.settings.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(
    player.level,
    levelLimit,
  );
  const levelIncrementDisabled = isLevelIncrementDisabled(
    player.level,
    levelLimit,
    epic,
  );

  const onBonusDecrement = useCallback(
    () =>
      dispatch((_, getState) =>
        dispatch(
          setCombatPlayerBonus(getState().present.combat.playerBonus - 1),
        ),
      ),
    [dispatch],
  );

  const onBonusIncrement = useCallback(
    () =>
      dispatch((_, getState) =>
        dispatch(
          setCombatPlayerBonus(getState().present.combat.playerBonus + 1),
        ),
      ),
    [dispatch],
  );

  const onLevelDecrement = useCallback(
    () => dispatch(decrementPlayerLevel(player.id)),
    [dispatch, player.id],
  );

  const onLevelIncrement = useCallback(
    () => dispatch(incrementPlayerLevel(player.id)),
    [dispatch, player.id],
  );

  const onGearDecrement = useCallback(
    () => dispatch(decrementPlayerGear(player.id)),
    [dispatch, player.id],
  );

  const onGearIncrement = useCallback(
    () => dispatch(incrementPlayerGear(player.id)),
    [dispatch, player.id],
  );

  const onSexToggle = useCallback(() => dispatch(togglePlayerSex(player.id)), [
    dispatch,
    player.id,
  ]);

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

SinglePlayer.displayName = displayName;

export default SinglePlayer;
