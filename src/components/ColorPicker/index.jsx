import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../constants';

import Color from './Color';
import Dialog from './Dialog';

const ColorPicker = ({
  onChange, onClick, onRequestClose, open, value,
}) => (
  <Fragment>
    <Color
      onClick={onClick}
      value={value}
    />
    <Dialog
      onRequestClose={onRequestClose}
      open={open}
      onSelect={(color) => {
        onChange(color);
        onRequestClose();
      }}
    />
  </Fragment>
);

ColorPicker.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onRequestClose: PropTypes.func,
  open: PropTypes.bool,
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  onChange: noop,
  onClick: noop,
  onRequestClose: noop,
  open: false,
  value: '',
};

export default ColorPicker;
