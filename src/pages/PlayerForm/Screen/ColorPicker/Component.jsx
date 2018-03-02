import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import Color from './Color';
import Dialog from './Dialog';

class ColorPicker extends PureComponent {
  render() {
    const { onChange, onClick, onClose, open, value, ...props } = this.props;

    return (
      <Fragment>
        <Color onClick={onClick} value={value} {...props} />
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
  }
}

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
