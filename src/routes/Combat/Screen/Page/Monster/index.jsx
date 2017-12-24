import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Counter from '../../../../../components/Counter';
import { noop } from '../../../../../constants';
import { classesObject, monsterInstance } from '../../../../../utils/propTypes';

const styles = {
  monster: {
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
  monster,
  onBonusDecrement,
  onBonusIncrement,
  onLevelDecrement,
  onLevelIncrement,
  title,
}) => (
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
        compact
        onDecrement={() => onLevelDecrement(monster.id)}
        onIncrement={() => onLevelIncrement(monster.id)}
        title={<FormattedMessage id="combat.monster.level" defaultMessage="Level" />}
        value={monster.level}
      />
      <Counter
        className={classes.item}
        compact
        onDecrement={() => onBonusDecrement(monster.id)}
        onIncrement={() => onBonusIncrement(monster.id)}
        title={<FormattedMessage id="combat.monster.modifier" defaultMessage="Modifier" />}
        value={monster.bonus}
      />
    </div>
  </div>
);

CombatMonster.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  monster: monsterInstance.isRequired, // eslint-disable-line react/no-typos
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
