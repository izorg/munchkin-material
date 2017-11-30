import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import Counter from '../../Counter';
import { noop } from '../../../constants';
import { classesObject, playerInstance } from '../../../utils/propTypes';

const styles = {
  player: {
    textAlign: 'center',
  },

  name: {
    margin: '0 0 8px',
  },

  stats: {
    display: 'flex',
  },

  item: {
    flex: 1,
  },
};

class CombatPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleGearDecrement = this.handleGearDecrement.bind(this);
    this.handleGearIncrement = this.handleGearIncrement.bind(this);
    this.handleLevelDecrement = this.handleLevelDecrement.bind(this);
    this.handleLevelIncrement = this.handleLevelIncrement.bind(this);
  }

  handleBonusChange(value) {
    const { bonus, onBonusChange } = this.props;

    onBonusChange(bonus + value);
  }

  handleGearDecrement() {
    const { player, onGearDecrement } = this.props;

    onGearDecrement(player);
  }

  handleGearIncrement() {
    const { player, onGearIncrement } = this.props;

    onGearIncrement(player);
  }

  handleLevelDecrement() {
    const { player, onLevelDecrement } = this.props;

    onLevelDecrement(player);
  }

  handleLevelIncrement() {
    const { player, onLevelIncrement } = this.props;

    onLevelIncrement(player);
  }

  render() {
    const { bonus, classes, player } = this.props;

    return (
      <div className={classes.player} key={player.id.toString()}>
        <Typography
          align="center"
          className={classes.name}
          component="div"
          noWrap
        >
          {player.name}
        </Typography>

        <div className={classes.stats}>
          <Counter
            className={classes.item}
            compact
            onDecrement={this.handleLevelDecrement}
            onIncrement={this.handleLevelIncrement}
            title={<FormattedMessage id="combat.player.level" defaultMessage="Level" />}
            value={player.level}
          />
          <Counter
            className={classes.item}
            compact
            onDecrement={this.handleGearDecrement}
            onIncrement={this.handleGearIncrement}
            title={<FormattedMessage id="combat.player.gear" defaultMessage="Gear" />}
            value={player.gear}
          />
          <Counter
            className={classes.item}
            compact
            onDecrement={() => this.handleBonusChange(-1)}
            onIncrement={() => this.handleBonusChange(+1)}
            title={<FormattedMessage id="combat.player.modifier" defaultMessage="Modifier" />}
            value={bonus}
          />
        </div>
      </div>
    );
  }
}

CombatPlayer.propTypes = {
  bonus: PropTypes.number.isRequired,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  onBonusChange: PropTypes.func,
  onGearDecrement: PropTypes.func,
  onGearIncrement: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
};

CombatPlayer.defaultProps = {
  onBonusChange: noop,
  onGearDecrement: noop,
  onGearIncrement: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
};

export default withStyles(styles)(CombatPlayer);
