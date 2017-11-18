import React, { createElement, PureComponent } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/es/Dialog';
import IconButton from 'material-ui/es/IconButton';
import { withStyles } from 'material-ui/es/styles';

import DiceTransition from './Transition';

import { noop } from '../../constants';
import DiceOne from '../icons/dice/one';
import DiceTwo from '../icons/dice/two';
import DiceThree from '../icons/dice/three';
import DiceFour from '../icons/dice/four';
import DiceFive from '../icons/dice/five';
import DiceSix from '../icons/dice/six';
import { classesObject } from '../../utils/propTypes';

const diceSize = 120;

const styles = {
  content: {
    height: diceSize,
    position: 'relative',
    width: diceSize,
  },

  button: {
    display: 'block',
    fontSize: diceSize,
    height: diceSize,
    padding: 0,
    width: diceSize,
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
    const { classes, dice, ...props } = this.props;
    const { attempt } = this.state;

    delete props.onDiceClick;

    return (
      <Dialog {...props}>
        <TransitionGroup className={classes.content}>
          <DiceTransition key={attempt}>
            <IconButton
              className={classes.button}
              color="inherit"
              disableRipple
              onClick={this.handleDiceClick}
            >
              {dice && createElement(diceComponent[dice])}
            </IconButton>
          </DiceTransition>
        </TransitionGroup>
      </Dialog>
    );
  }
}

DiceDialog.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  dice: PropTypes.number,
  onDiceClick: PropTypes.func,
};

DiceDialog.defaultProps = {
  dice: null,
  onDiceClick: noop,
};

export default withStyles(styles)(DiceDialog);
