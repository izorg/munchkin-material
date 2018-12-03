import React, { createElement, PureComponent } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DiceOne from 'mdi-material-ui/Dice1';
import DiceTwo from 'mdi-material-ui/Dice2';
import DiceThree from 'mdi-material-ui/Dice3';
import DiceFour from 'mdi-material-ui/Dice4';
import DiceFive from 'mdi-material-ui/Dice5';
import DiceSix from 'mdi-material-ui/Dice6';
import { noop } from 'lodash/fp';

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

  icon: {
    display: 'block',
    fontSize: 'inherit',
  },
});

const diceComponent = {
  1: DiceOne,
  2: DiceTwo,
  3: DiceThree,
  4: DiceFour,
  5: DiceFive,
  6: DiceSix,
};

class DiceDialog extends PureComponent {
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
              <span>
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
  onDiceClick: PropTypes.func,
};

DiceDialog.defaultProps = {
  dice: null,
  onDiceClick: noop,
};

export default withStyles(styles)(DiceDialog);
