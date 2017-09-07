import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';

import DiceTransition from './DiceTransition';

import { noop } from '../../constants';
import DiceOne from '../icons/dice/one';
import DiceTwo from '../icons/dice/two';
import DiceThree from '../icons/dice/three';
import DiceFour from '../icons/dice/four';
import DiceFive from '../icons/dice/five';
import DiceSix from '../icons/dice/six';

import cn from './style.css';

const iconSize = 120;

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
    const { dice, onRequestClose } = this.props;
    const { attempt } = this.state;

    return (
      <Dialog
        bodyStyle={{
          padding: 0,
        }}
        contentStyle={{
          height: iconSize,
          width: iconSize,
        }}
        modal={false}
        onRequestClose={onRequestClose}
        open={!!dice}
      >
        <TransitionGroup className={cn.content}>
          <DiceTransition key={attempt}>
            <div>
              <IconButton
                disableTouchRipple
                iconStyle={{
                  height: iconSize,
                  width: iconSize,
                }}
                onClick={this.handleDiceClick}
                style={{
                  display: 'block',
                  height: iconSize,
                  padding: 0,
                  width: iconSize,
                }}
              >
                {
                  dice === 1 ? <DiceOne /> : null
                }
                {
                  dice === 2 ? <DiceTwo /> : null
                }
                {
                  dice === 3 ? <DiceThree /> : null
                }
                {
                  dice === 4 ? <DiceFour /> : null
                }
                {
                  dice === 5 ? <DiceFive /> : null
                }
                {
                  dice === 6 ? <DiceSix /> : null
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
  dice: PropTypes.number,
  onDiceClick: PropTypes.func,
  onRequestClose: PropTypes.func,
};

DiceDialog.defaultProps = {
  dice: 0,
  onDiceClick: noop,
  onRequestClose: noop,
};

export default DiceDialog;
