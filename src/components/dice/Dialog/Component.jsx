import React, { createElement, PureComponent } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';

import DiceTransition from '../Transition';

import DiceOne from '../../icons/dice/one';
import DiceTwo from '../../icons/dice/two';
import DiceThree from '../../icons/dice/three';
import DiceFour from '../../icons/dice/four';
import DiceFive from '../../icons/dice/five';
import DiceSix from '../../icons/dice/six';

const diceSize = 120;

const styles = {
  button: {
    display: 'block',
    fontSize: diceSize,
    height: diceSize,
    padding: 0,
    position: 'relative',
    width: diceSize,
  },

  iconWrapper: {
    display: 'block',
  },

  icon: {
    display: 'block',
    fontSize: 'inherit',
  },
};

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

    this.setState({ attempt: attempt + 1 }, onDiceClick);
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
          focusVisibleClassName=""
          onClick={this.handleDiceClick}
        >
          <DiceTransition key={attempt}>
            <span className={classes.iconWrapper}>
              {dice &&
                createElement(diceComponent[dice], {
                  className: classes.icon,
                })}
            </span>
          </DiceTransition>
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
