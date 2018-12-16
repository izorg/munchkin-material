import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import { noop } from 'lodash/fp';

import Counter from '../../Counter';

const styles = {
  monster: {
    padding: 8,
    textAlign: 'center',
  },

  stats: {
    display: 'flex',
  },

  item: {
    flex: 1,
  },

  name: {
    margin: '0 0 8px',
  },
};

const CombatMonster = ({
  classes,
  bonus,
  id,
  level,
  onBonusDecrement,
  onBonusIncrement,
  onLevelDecrement,
  onLevelIncrement,
  title,
}) => (
  <div className={classes.monster}>
    <Typography align="center" className={classes.name} component="div" noWrap>
      {title}
    </Typography>

    <div className={classes.stats}>
      <Counter
        className={classes.item}
        onDecrement={() => onLevelDecrement(id)}
        onIncrement={() => onLevelIncrement(id)}
        title={
          <FormattedMessage id="combat.monster.level" defaultMessage="Level" />
        }
        value={level}
      />
      <Counter
        className={classes.item}
        onDecrement={() => onBonusDecrement(id)}
        onIncrement={() => onBonusIncrement(id)}
        title={
          <FormattedMessage
            id="combat.monster.modifier"
            defaultMessage="Modifier"
          />
        }
        value={bonus}
      />
    </div>
  </div>
);

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

export default withStyles(styles)(CombatMonster);
