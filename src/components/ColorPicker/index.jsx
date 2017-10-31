import React from 'react';

import Color from './Color';
import Dialog from './Dialog';

const ColorPicker = ({
  onChange, onClick, onRequestClose, open, value,
}) => [
  <Color
    key="picker"
    onClick={onClick}
    value={value}
  />,
  <Dialog
    key="dialog"
    onRequestClose={onRequestClose}
    open={open}
    onSelect={(color) => {
      onChange(color);
      onRequestClose();
    }}
  />,
];

export default ColorPicker;
