import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';

import DiceTransition from './Transition';

import { noop } from '../../constants';
import DiceOne from '../icons/dice/one';
import DiceTwo from '../icons/dice/two';
import DiceThree from '../icons/dice/three';
import DiceFour from '../icons/dice/four';
import DiceFive from '../icons/dice/five';
import DiceSix from '../icons/dice/six';
import { classesObject } from '../../utils/propTypes';

const iconSize = 120;

const diceProps = {
  style: {
    height: iconSize,
    width: iconSize,
  },
};

const styles = {
  content: {
    height: 120,
    position: 'relative',
    width: 120,
  },
};

class DiceDialog extends Component {
  componentWillMount() {
    this.setState({
      attempt: 0,
    });

    this.handleDiceClick = this.handleDiceClick.bind(this);
  }

  handleDiceClick() {
    const { onDiceClick } = this.props;
    const { attempt } = this.state;

    this.setState({
      attempt: attempt + 1,
    }, onDiceClick);
  }

  render() {
    const { classes, dice, onRequestClose } = this.props;
    const { attempt } = this.state;

    return (
      <Dialog
        onRequestClose={onRequestClose}
        open={!!dice}
      >
        <TransitionGroup className={classes.content}>
          <DiceTransition key={attempt}>
            <div>
              <IconButton
                color="inherit"
                disableRipple
                onClick={this.handleDiceClick}
                style={{
                  display: 'block',
                  height: iconSize,
                  padding: 0,
                  width: iconSize,
                }}
              >
                {
                  dice === 1 ? <DiceOne {...diceProps} /> : null
                }
                {
                  dice === 2 ? <DiceTwo {...diceProps} /> : null
                }
                {
                  dice === 3 ? <DiceThree {...diceProps} /> : null
                }
                {
                  dice === 4 ? <DiceFour {...diceProps} /> : null
                }
                {
                  dice === 5 ? <DiceFive {...diceProps} /> : null
                }
                {
                  dice === 6 ? <DiceSix {...diceProps} /> : null
                }
              </IconButton>
            </div>
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
  onRequestClose: PropTypes.func,
};

DiceDialog.defaultProps = {
  dice: 0,
  onDiceClick: noop,
  onRequestClose: noop,
};

export default withStyles(styles)(DiceDialog);
