import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import { withStyles } from 'material-ui/styles';
import { noop } from 'lodash';

import availableColors from './availableColors';
import Color from './Color';

const styles = {
  paper: {
    maxWidth: 288, // 6 * 48 = 288
  },
};

const ColorPickerPopover = ({ classes, onSelect, value, ...props }) => (
  <Popover classes={{ paper: classes.paper }} {...props}>
    {Object.keys(availableColors).map((color) => (
      <Color
        key={color}
        onClick={() => onSelect(availableColors[color][500])}
        selected={value === availableColors[color][500]}
        value={availableColors[color][500]}
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
