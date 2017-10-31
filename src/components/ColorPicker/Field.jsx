import React from 'react';

import ColorPicker from './index';

// eslint-disable-next-line react/prop-types
const ColorPickerField = ({ input, ...props }) => (
  <ColorPicker {...input} {...props} />
);

export default ColorPickerField;
