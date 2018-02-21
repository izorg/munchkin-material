import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import Color from './Color';
import Dialog from './Dialog';

const ColorPicker = ({ onChange, onClick, onClose, open, value }) => (
  <Fragment>
    <Color onClick={onClick} value={value} />
    <Dialog
      onClose={onClose}
      open={open}
      onSelect={(color) => {
        onChange(color);
        onClose();
      }}
      value={value}
    />
  </Fragment>
);

ColorPicker.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  onChange: noop,
  onClick: noop,
  onClose: noop,
  open: false,
  value: '',
};

export default ColorPicker;
