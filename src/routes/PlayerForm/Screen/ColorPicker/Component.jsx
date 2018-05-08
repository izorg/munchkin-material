import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { noop } from 'lodash';

import Color from './Color';
import Dialog from './Dialog';

const styles = {
  color: {
    marginLeft: -6,
  },
};

class ColorPicker extends PureComponent {
  constructor(props) {
    super(props);

    this.ignoreNextBlur = false;

    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleBlur(event) {
    const { onBlur } = this.props;

    if (this.ignoreNextBlur === true) {
      // The parent components are relying on the bubbling of the event.
      event.stopPropagation();
      this.ignoreNextBlur = false;

      return;
    }

    onBlur(event);
  }

  handleClick(event) {
    const { onClick, onOpen } = this.props;

    this.ignoreNextBlur = true;

    onClick(event);
    onOpen();
  }

  handleKeyDown(event) {
    if ([' ', 'Enter'].includes(event.key)) {
      this.ignoreNextBlur = true;
    }
  }

  render() {
    const {
      classes,
      name,
      onChange,
      onClose,
      onFocus,
      open,
      value,
    } = this.props;

    return (
      <Fragment>
        <Color
          className={classes.color}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          name={name}
          value={value}
        />
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
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onFocus: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  onBlur: noop,
  onChange: noop,
  onClick: noop,
  onClose: noop,
  onFocus: noop,
  onOpen: noop,
  open: false,
  value: '',
};

export default withStyles(styles)(ColorPicker);
