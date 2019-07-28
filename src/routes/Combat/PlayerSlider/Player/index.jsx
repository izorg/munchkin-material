import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton, makeStyles, Typography } from '@material-ui/core';

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

const useStyles = makeStyles(
  {
    player: {
      padding: 8,
      position: 'relative',
      textAlign: 'center',
    },

    name: {
      margin: '0 0 8px',
      padding: '0 24px',
    },

    stats: {
      display: 'flex',
    },

    item: {
      flex: 1,
      overflow: 'hidden',
    },

    sex: {
      padding: 6,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  },
  { name: 'CombatPlayer' },
);

const CombatPlayer = ({ playerId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const players = useSelector((state) => state.players);
  const { gear, id, level, name, sex } = players[playerId];

  const levelLimit = useSelector((state) => state.app.levelLimit);
  const epic = useSelector((state) => state.app.epic);

  const levelDecrementDisabled = isLevelDecrementDisabled(level, levelLimit);
  const levelIncrementDisabled = isLevelIncrementDisabled(
    level,
    levelLimit,
    epic,
  );

  const combat = useSelector((state) => state.combat);
  const bonus =
    playerId === combat.helperId ? combat.helperBonus : combat.playerBonus;

  const onBonusChange = (value) =>
    dispatch(
      playerId === combat.helperId
        ? setCombatHelperBonus(value)
        : setCombatPlayerBonus(value),
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
          onDecrement={() => dispatch(decrementPlayerLevel(id))}
          onIncrement={() => dispatch(incrementPlayerLevel(id))}
          title={intl.formatMessage(counterMessages.level)}
          value={level}
        />
        <Counter
          className={classes.item}
          onDecrement={() => dispatch(decrementPlayerGear(id))}
          onIncrement={() => dispatch(incrementPlayerGear(id))}
          title={intl.formatMessage(counterMessages.gear)}
          value={gear}
        />
        <Counter
          className={classes.item}
          onDecrement={() => onBonusChange(bonus - 1)}
          onIncrement={() => onBonusChange(bonus + 1)}
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

export default CombatPlayer;