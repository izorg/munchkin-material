import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';

import cn from './style.css';

import { noop } from '../../constants';
import DiceOne from '../icons/dice/one';
import DiceTwo from '../icons/dice/two';
import DiceThree from '../icons/dice/three';
import DiceFour from '../icons/dice/four';
import DiceFive from '../icons/dice/five';
import DiceSix from '../icons/dice/six';

const iconSize = 120;

class DiceDialog extends Component {
  componentWillMount() {
    this.setState({
      attempt: 0,
    });

    this.handleDiceTouchTap = this.handleDiceTouchTap.bind(this);
  }

  handleDiceTouchTap() {
    const { onDiceTouchTap } = this.props;
    const { attempt } = this.state;

    this.setState({
      attempt: attempt + 1,
    }, onDiceTouchTap);
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
        <CSSTransitionGroup
          className={cn.content}
          component="div"
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
          transitionName={{
            enter: cn.itemEnter,
            enterActive: cn.itemEnterActive,
            leave: cn.itemLeave,
            leaveActive: cn.itemLeaveActive,
          }}
        >
          <div key={attempt}>
            <IconButton
              disableTouchRipple
              iconStyle={{
                height: iconSize,
                width: iconSize,
              }}
              onTouchTap={this.handleDiceTouchTap}
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
        </CSSTransitionGroup>
      </Dialog>
    );
  }
}

DiceDialog.propTypes = {
  dice: PropTypes.number,
  onDiceTouchTap: PropTypes.func,
  onRequestClose: PropTypes.func,
};

DiceDialog.defaultProps = {
  dice: 0,
  onDiceTouchTap: noop,
  onRequestClose: noop,
};

export default DiceDialog;
