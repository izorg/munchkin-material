import React from 'react';

import ColorPicker from './Component';

// eslint-disable-next-line react/prop-types
const ColorPickerField = ({ input, ...props }) => (
  <ColorPicker {...input} {...props} />
);

export default ColorPickerField;
