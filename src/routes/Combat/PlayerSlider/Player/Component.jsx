import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { noop } from 'lodash/fp';

import { messages } from '../../../../components/Counter';
import Sex from '../../../../components/Sex';
import { sexProp } from '../../../../utils/propTypes';

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

const CombatPlayer = ({
  bonus,
  gear,
  id,
  level,
  levelDecrementDisabled,
  levelIncrementDisabled,
  name,
  onBonusChange,
  onGearDecrement,
  onGearIncrement,
  onLevelDecrement,
  onLevelIncrement,
  onSexToggle,
  sex,
}) => {
  const classes = useStyles();
  const intl = useIntl();

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

      <IconButton className={classes.sex} onClick={() => onSexToggle(id)}>
        <Sex sex={sex} />
      </IconButton>

      <div className={classes.stats}>
        <Counter
          className={classes.item}
          decrementDisabled={levelDecrementDisabled}
          incrementDisabled={levelIncrementDisabled}
          onDecrement={() => onLevelDecrement(id)}
          onIncrement={() => onLevelIncrement(id)}
          title={intl.formatMessage(messages.level)}
          value={level}
        />
        <Counter
          className={classes.item}
          onDecrement={() => onGearDecrement(id)}
          onIncrement={() => onGearIncrement(id)}
          title={
            <FormattedMessage defaultMessage="Gear" id="combat.player.gear" />
          }
          value={gear}
        />
        <Counter
          className={classes.item}
          onDecrement={() => onBonusChange(bonus - 1)}
          onIncrement={() => onBonusChange(bonus + 1)}
          title={
            <FormattedMessage
              defaultMessage="Modifier"
              id="combat.player.modifier"
            />
          }
          value={bonus}
        />
      </div>
    </div>
  );
};

CombatPlayer.propTypes = {
  bonus: PropTypes.number.isRequired,
  gear: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  levelDecrementDisabled: PropTypes.bool,
  levelIncrementDisabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBonusChange: PropTypes.func,
  onGearDecrement: PropTypes.func,
  onGearIncrement: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  onSexToggle: PropTypes.func,
  sex: sexProp.isRequired,
};

CombatPlayer.defaultProps = {
  levelDecrementDisabled: false,
  levelIncrementDisabled: false,
  onBonusChange: noop,
  onGearDecrement: noop,
  onGearIncrement: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
  onSexToggle: noop,
};

export default CombatPlayer;
