import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash/fp';

import availableColors from '../../../../../utils/availableColors';

import Color from './Color';

const styles = {
  paper: {
    maxWidth: 288, // 6 * 48 = 288
  },
};

const ColorPickerPopover = ({ classes, onSelect, value, ...props }) => (
  <Popover classes={{ paper: classes.paper }} {...props}>
    {availableColors.map((color) => (
      <Color
        key={color}
        onClick={() => onSelect(color)}
        selected={value === color}
        value={color}
      />
    ))}
  </Popover>
);

ColorPickerPopover.propTypes = {
  onSelect: PropTypes.func,
  value: PropTypes.string.isRequired,
};

ColorPickerPopover.defaultProps = {
  onSelect: noop,
};

export default withStyles(styles)(ColorPickerPopover);
