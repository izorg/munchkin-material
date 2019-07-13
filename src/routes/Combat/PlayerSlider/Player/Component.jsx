import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { IconButton, Typography, withStyles } from '@material-ui/core';
import { noop } from 'lodash/fp';

import Sex from '../../../../components/Sex';
import { sexProp } from '../../../../utils/propTypes';

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
    overflow: 'hidden',
  },

  sex: {
    padding: 6,
    position: 'absolute',
    right: 0,
    top: 0,
  },
};

class CombatPlayer extends Component {
  constructor(props) {
    super(props);

    this.handleBonusDecrement = this.handleBonusDecrement.bind(this);
    this.handleBonusIncrement = this.handleBonusIncrement.bind(this);
    this.handleGearDecrement = this.handleGearDecrement.bind(this);
    this.handleGearIncrement = this.handleGearIncrement.bind(this);
    this.handleLevelDecrement = this.handleLevelDecrement.bind(this);
    this.handleLevelIncrement = this.handleLevelIncrement.bind(this);
    this.handleSexToggle = this.handleSexToggle.bind(this);
  }

  handleBonusDecrement() {
    const { bonus, onBonusChange } = this.props;

    onBonusChange(bonus - 1);
  }

  handleBonusIncrement() {
    const { bonus, onBonusChange } = this.props;

    onBonusChange(bonus + 1);
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

  handleSexToggle() {
    const { id, onSexToggle } = this.props;

    onSexToggle(id);
  }

  render() {
    const {
      bonus,
      classes,
      gear,
      level,
      levelDecrementDisabled,
      levelIncrementDisabled,
      name,
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

        <IconButton className={classes.sex} onClick={this.handleSexToggle}>
          <Sex sex={sex} />
        </IconButton>

        <div className={classes.stats}>
          <Counter
            className={classes.item}
            decrementDisabled={levelDecrementDisabled}
            incrementDisabled={levelIncrementDisabled}
            onDecrement={this.handleLevelDecrement}
            onIncrement={this.handleLevelIncrement}
            title={
              <FormattedMessage
                defaultMessage="Level"
                id="combat.player.level"
              />
            }
            value={level}
          />
          <Counter
            className={classes.item}
            onDecrement={this.handleGearDecrement}
            onIncrement={this.handleGearIncrement}
            title={
              <FormattedMessage defaultMessage="Gear" id="combat.player.gear" />
            }
            value={gear}
          />
          <Counter
            className={classes.item}
            onDecrement={this.handleBonusDecrement}
            onIncrement={this.handleBonusIncrement}
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
  }
}

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

export default withStyles(styles)(CombatPlayer);
