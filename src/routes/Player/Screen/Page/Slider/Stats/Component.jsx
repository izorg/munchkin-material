import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';
import { noop } from 'lodash';

import Counter from '../../../../../../components/Counter';
import Sex from '../../../../../../components/Sex';
import { playerShape } from '../../../../../../utils/propTypes';

const styles = (theme) => ({
  stats: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
  },

  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 50%',
    justifyContent: 'center',
  },

  counters: {
    flex: '1 1 50%',
    display: 'flex',
  },

  counterContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 50%',
    justifyContent: 'center',
  },

  strengthCounter: {
    textAlign: 'center',
  },

  strengthTitle: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 24,
  },

  strengthValue: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 72, // 36px * 2
    lineHeight: 0.575, // 1.15 / 2
    marginTop: 32,
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

  '@media (orientation: landscape)': {
    stats: {
      flexDirection: 'row',
    },

    strengthValue: {
      marginTop: 64,
    },
  },
});

const PlayerStats = ({
  classes,
  className,
  onGearDecrement,
  onGearIncrement,
  onLevelDecrement,
  onLevelIncrement,
  onSexToggle,
  player,
}) => (
  <div className={cns(className, classes.stats)}>
    <div className={classes.counters}>
      <div className={classes.counterContainer}>
        <Counter
          onDecrement={() => onLevelDecrement(player.id)}
          onIncrement={() => onLevelIncrement(player.id)}
          title={
            <FormattedMessage id="player.stats.level" defaultMessage="Level" />
          }
          value={player.level}
        />
      </div>
      <div className={classes.counterContainer}>
        <Counter
          onDecrement={() => onGearDecrement(player.id)}
          onIncrement={() => onGearIncrement(player.id)}
          title={
            <FormattedMessage id="player.stats.gear" defaultMessage="Gear" />
          }
          value={player.gear}
        />
      </div>
    </div>
    <div className={classes.mainContainer}>
      <div className={classes.strengthCounter}>
        <div className={classes.strengthTitle}>
          <FormattedMessage
            id="player.stats.strength"
            defaultMessage="Strength"
          />
        </div>

        <div className={classes.strengthValue}>
          {player.level + player.gear}
        </div>

        <IconButton
          className={classes.sex}
          color="inherit"
          onClick={() => onSexToggle(player.id)}
        >
          <Sex className={classes.sexIcon} sex={player.sex} />
        </IconButton>
      </div>
    </div>
  </div>
);

PlayerStats.propTypes = {
  className: PropTypes.string,
  onGearDecrement: PropTypes.func,
  onGearIncrement: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  onSexToggle: PropTypes.func,
  player: playerShape.isRequired,
};

PlayerStats.defaultProps = {
  className: '',
  onGearDecrement: noop,
  onGearIncrement: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
  onSexToggle: noop,
};

export default withStyles(styles)(PlayerStats);
