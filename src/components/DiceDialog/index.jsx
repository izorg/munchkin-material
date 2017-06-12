import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';

import { noop } from '../../constants';
import DiceOneIcon from '../icons/dice/one';
import DiceTwoIcon from '../icons/dice/two';
import DiceThreeIcon from '../icons/dice/three';
import DiceFourIcon from '../icons/dice/four';
import DiceFiveIcon from '../icons/dice/five';
import DiceSixIcon from '../icons/dice/six';

const iconSize = 120;

const DiceDialog = ({ dice, onDiceTouchTap, onRequestClose }) => (
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
    <IconButton
      disableTouchRipple
      iconStyle={{
        height: iconSize,
        width: iconSize,
      }}
      onTouchTap={onDiceTouchTap}
      style={{
        display: 'block',
        height: iconSize,
        padding: 0,
        width: iconSize,
      }}
    >
      {
        dice === 1 ? <DiceOneIcon /> : null
      }
      {
        dice === 2 ? <DiceTwoIcon /> : null
      }
      {
        dice === 3 ? <DiceThreeIcon /> : null
      }
      {
        dice === 4 ? <DiceFourIcon /> : null
      }
      {
        dice === 5 ? <DiceFiveIcon /> : null
      }
      {
        dice === 6 ? <DiceSixIcon /> : null
      }
    </IconButton>
  </Dialog>
);

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
