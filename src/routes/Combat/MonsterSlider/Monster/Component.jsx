import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import { noop } from 'lodash/fp';

import Counter from '../../Counter';

const useStyles = makeStyles(
  {
    monster: {
      padding: 8,
      textAlign: 'center',
    },

    stats: {
      display: 'flex',
    },

    item: {
      flex: 1,
      overflowX: 'hidden',
    },

    name: {
      margin: '0 0 8px',
    },
  },
  { name: 'CombatMonster' },
);

const CombatMonster = ({
  bonus,
  id,
  level,
  onBonusDecrement,
  onBonusIncrement,
  onLevelDecrement,
  onLevelIncrement,
  title,
}) => {
  const classes = useStyles();

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
          onDecrement={() => onLevelDecrement(id)}
          onIncrement={() => onLevelIncrement(id)}
          title={
            <FormattedMessage
              defaultMessage="Level"
              id="combat.monster.level"
            />
          }
          value={level}
        />
        <Counter
          className={classes.item}
          onDecrement={() => onBonusDecrement(id)}
          onIncrement={() => onBonusIncrement(id)}
          title={
            <FormattedMessage
              defaultMessage="Modifier"
              id="combat.monster.modifier"
            />
          }
          value={bonus}
        />
      </div>
    </div>
  );
};

CombatMonster.propTypes = {
  bonus: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  onBonusDecrement: PropTypes.func,
  onBonusIncrement: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  title: PropTypes.node,
};

CombatMonster.defaultProps = {
  onBonusDecrement: noop,
  onBonusIncrement: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
  title: '',
};

export default CombatMonster;
