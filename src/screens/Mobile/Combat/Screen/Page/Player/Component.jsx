import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import noop from '../../../../../../utils/noop';
import { classesObject, playerInstance } from '../../../../../../utils/propTypes';

import Counter from '../../../../../../components/Counter';
import Gender from '../../../../../../components/Gender';

const styles = {
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
  },

  gender: {
    height: 36,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 36,
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

    onGearDecrement(player.id);
  }

  handleGearIncrement() {
    const { player, onGearIncrement } = this.props;

    onGearIncrement(player.id);
  }

  handleLevelDecrement() {
    const { player, onLevelDecrement } = this.props;

    onLevelDecrement(player.id);
  }

  handleLevelIncrement() {
    const { player, onLevelIncrement } = this.props;

    onLevelIncrement(player.id);
  }

  render() {
    const {
      bonus, classes, onGenderToggle, player,
    } = this.props;

    return (
      <div className={classes.player} key={player.id}>
        <Typography
          align="center"
          className={classes.name}
          component="div"
          noWrap
        >
          {player.name}
        </Typography>

        <IconButton
          className={classes.gender}
          color="inherit"
          onClick={() => onGenderToggle(player.id)}
        >
          <Gender gender={player.gender} />
        </IconButton>

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
  onGenderToggle: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
};

CombatPlayer.defaultProps = {
  onBonusChange: noop,
  onGearDecrement: noop,
  onGearIncrement: noop,
  onGenderToggle: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
};

export default withStyles(styles)(CombatPlayer);
