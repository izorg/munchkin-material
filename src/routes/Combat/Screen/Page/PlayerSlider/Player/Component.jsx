import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';

import Sex from '../../../../../../components/Sex';
import { sexProp } from '../../../../../../utils/propTypes';

import Counter from '../../Counter';

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

  sex: {
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
    const { id, onGearDecrement } = this.props;

    onGearDecrement(id);
  }

  handleGearIncrement() {
    const { id, onGearIncrement } = this.props;

    onGearIncrement(id);
  }

  handleLevelDecrement() {
    const { id, onLevelDecrement } = this.props;

    onLevelDecrement(id);
  }

  handleLevelIncrement() {
    const { id, onLevelIncrement } = this.props;

    onLevelIncrement(id);
  }

  render() {
    const {
      bonus,
      classes,
      gear,
      id,
      level,
      name,
      onSexToggle,
      sex,
    } = this.props;

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
          color="inherit"
          onClick={() => onSexToggle(id)}
        >
          <Sex sex={sex} />
        </IconButton>

        <div className={classes.stats}>
          <Counter
            className={classes.item}
            onDecrement={this.handleLevelDecrement}
            onIncrement={this.handleLevelIncrement}
            title={
              <FormattedMessage
                id="combat.player.level"
                defaultMessage="Level"
              />
            }
            value={level}
          />
          <Counter
            className={classes.item}
            onDecrement={this.handleGearDecrement}
            onIncrement={this.handleGearIncrement}
            title={
              <FormattedMessage id="combat.player.gear" defaultMessage="Gear" />
            }
            value={gear}
          />
          <Counter
            className={classes.item}
            onDecrement={() => this.handleBonusChange(-1)}
            onIncrement={() => this.handleBonusChange(+1)}
            title={
              <FormattedMessage
                id="combat.player.modifier"
                defaultMessage="Modifier"
              />
            }
            value={bonus}
          />
        </div>
      </div>
    );
  }
}

CombatPlayer.propTypes = {
  bonus: PropTypes.number.isRequired,
  gear: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
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
  onBonusChange: noop,
  onGearDecrement: noop,
  onGearIncrement: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
  onSexToggle: noop,
};

export default withStyles(styles)(CombatPlayer);
