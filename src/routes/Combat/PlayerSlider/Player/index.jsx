import { IconButton, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { counterMessages } from '../../../../components/Counter';
import Sex from '../../../../components/Sex';
import {
  setCombatHelperBonus,
  setCombatPlayerBonus,
} from '../../../../ducks/combat';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  togglePlayerSex,
} from '../../../../ducks/players';
import {
  isLevelDecrementDisabled,
  isLevelIncrementDisabled,
} from '../../../../utils/levelLimit';
import Counter from '../../Counter';

const displayName = 'CombatPlayer';

const useStyles = makeStyles(
  (theme) => ({
    player: {
      padding: theme.spacing(1),
      position: 'relative',
      textAlign: 'center',
    },

    name: {
      margin: '0 0 16px',
      padding: '0 24px',
    },

    stats: {
      display: 'flex',
      margin: '0 auto',
      maxWidth: 420,
    },

    item: {
      flex: 1,
      overflow: 'hidden',
    },

    sex: {
      padding: 6,
      position: 'absolute',
      left: 0,
      top: 0,
    },
  }),
  { name: 'CombatPlayer' },
);

const CombatPlayer = ({ playerId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const players = useSelector((state) => state.present.players);
  const { gear, id, level, name, sex } = players[playerId];

  const levelLimit = useSelector((state) => state.present.settings.levelLimit);
  const epic = useSelector((state) => state.present.settings.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(level, levelLimit);
  const levelIncrementDisabled = isLevelIncrementDisabled(
    level,
    levelLimit,
    epic,
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
            : setCombatPlayerBonus(currentBonus + value),
        );
      });
    },
    [dispatch, playerId],
  );

  const onBonusDecrement = useCallback(() => onBonusChange(-1), [
    onBonusChange,
  ]);
  const onBonusIncrement = useCallback(() => onBonusChange(1), [onBonusChange]);

  const onPlayerLevelDecrement = useCallback(
    () => dispatch(decrementPlayerLevel(id)),
    [dispatch, id],
  );

  const onPlayerLevelIncrement = useCallback(
    () => dispatch(incrementPlayerLevel(id)),
    [dispatch, id],
  );

  const onPlayerGearDecrement = useCallback(
    () => dispatch(decrementPlayerGear(id)),
    [dispatch, id],
  );

  const onPlayerGearIncrement = useCallback(
    () => dispatch(incrementPlayerGear(id)),
    [dispatch, id],
  );

  return (
    <div className={classes.player}>
      <Typography
        align="center"
        className={classes.name}
        component="div"
        noWrap
      >
        {name}
      </Typography>

      <IconButton
        className={classes.sex}
        onClick={() => dispatch(togglePlayerSex(id))}
      >
        <Sex sex={sex} />
      </IconButton>

      <div className={classes.stats}>
        <Counter
          className={classes.item}
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={onPlayerLevelDecrement}
          onIncrement={onPlayerLevelIncrement}
          title={intl.formatMessage(counterMessages.level)}
          value={level}
        />
        <Counter
          className={classes.item}
          onDecrement={onPlayerGearDecrement}
          onIncrement={onPlayerGearIncrement}
          title={intl.formatMessage(counterMessages.gear)}
          value={gear}
        />
        <Counter
          className={classes.item}
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
