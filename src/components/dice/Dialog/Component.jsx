import React, { Component, createElement } from 'react';
import { TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { ButtonBase, Dialog, withStyles } from '@material-ui/core';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'mdi-material-ui';

import DiceTransition from '../Transition';

const diceSize = 120;

const styles = (theme) => ({
  button: {
    color: theme.palette.text.primary,
    display: 'block',
    fontSize: diceSize,
    height: diceSize,
    padding: 0,
    position: 'relative',
    width: diceSize,
  },

  iconWrapper: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  icon: {
    display: 'block',
    fontSize: 'inherit',
  },
});

const diceComponent = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

class DiceDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attempt: 0,
    };

    this.handleDiceClick = this.handleDiceClick.bind(this);
  }

  handleDiceClick() {
    const { onDiceClick } = this.props;
    const { attempt } = this.state;

    onDiceClick();

    this.setState({ attempt: attempt + 1 });
  }

  render() {
    const { classes, dice, onDiceClick, ...rest } = this.props;
    const { attempt } = this.state;

    return (
      <Dialog disableRestoreFocus {...rest}>
        <TransitionGroup
          autoFocus
          className={classes.button}
          component={ButtonBase}
          disableRipple
          onClick={this.handleDiceClick}
        >
          {dice && (
            <DiceTransition key={attempt}>
              <span className={classes.iconWrapper}>
                {createElement(diceComponent[dice], {
                  className: classes.icon,
                })}
              </span>
            </DiceTransition>
          )}
        </TransitionGroup>
      </Dialog>
    );
  }
}

DiceDialog.propTypes = {
  dice: PropTypes.number,
  onDiceClick: PropTypes.func.isRequired,
};

DiceDialog.defaultProps = {
  dice: null,
};

export default withStyles(styles)(DiceDialog);
