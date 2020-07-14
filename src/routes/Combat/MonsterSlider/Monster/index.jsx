import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { counterMessages } from '../../../../components/Counter';
import {
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
} from '../../../../ducks/monsters';
import Counter from '../../Counter';

const displayName = 'CombatMonster';

const useStyles = makeStyles(
  (theme) => ({
    monster: {
      padding: theme.spacing(1),
      textAlign: 'center',
    },

    name: {
      margin: '0 0 16px',
      padding: '0 24px',
    },

    stats: {
      display: 'flex',
      margin: '0 auto',
      maxWidth: 280,
    },

    item: {
      flex: 1,
      overflow: 'hidden',
    },
  }),
  { name: displayName },
);

const CombatMonster = ({ monsterId, title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const monsters = useSelector((state) => state.monsters);

  const { bonus, id, level } = monsters[monsterId];

  const omMonsterLevelDecrement = useCallback(
    () => dispatch(decrementMonsterLevel(id)),
    [dispatch, id],
  );

  const omMonsterLevelIncrement = useCallback(
    () => dispatch(incrementMonsterLevel(id)),
    [dispatch, id],
  );

  const onMonsterBonusDecrement = useCallback(
    () => dispatch(decrementMonsterBonus(id)),
    [dispatch, id],
  );

  const onMonsterBonusIncrement = useCallback(
    () => dispatch(incrementMonsterBonus(id)),
    [dispatch, id],
  );

  return (
    <div className={classes.monster}>
      <Typography
        align="center"
        className={classes.name}
        component="div"
        noWrap
      >
        {title}
      </Typography>

      <div className={classes.stats}>
        <Counter
          className={classes.item}
          onDecrement={omMonsterLevelDecrement}
          onIncrement={omMonsterLevelIncrement}
          title={intl.formatMessage(counterMessages.level)}
          value={level}
        />
        <Counter
          className={classes.item}
          onDecrement={onMonsterBonusDecrement}
          onIncrement={onMonsterBonusIncrement}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </div>
    </div>
  );
};

CombatMonster.propTypes = {
  monsterId: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
};

CombatMonster.displayName = displayName;

export default CombatMonster;
