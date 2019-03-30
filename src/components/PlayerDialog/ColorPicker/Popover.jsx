import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import availableColors from '../../../utils/availableColors';
import { colorType } from '../../../utils/propTypes';

import Color from './Color';

const useStyles = makeStyles({
  paper: {
    maxWidth: 288, // 6 * 48 = 288
  },
});

const ColorPickerPopover = ({ onSelect, value, ...props }) => {
  const classes = useStyles();

  return (
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
};

ColorPickerPopover.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: colorType.isRequired,
};

export default ColorPickerPopover;
