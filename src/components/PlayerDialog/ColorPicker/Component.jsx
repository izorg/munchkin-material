import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hidden, withStyles } from '@material-ui/core';
import { noop } from 'lodash/fp';

import Color from './Color';
import Dialog from './Dialog';
import Popover from './Popover';

const styles = {
  color: {
    marginLeft: -6,
  },
};

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.ignoreNextBlur = false;

    this.state = {
      anchorEl: undefined,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleButtonRef = this.handleButtonRef.bind(this);
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

  handleButtonRef(anchorEl) {
    this.setState({
      anchorEl,
    });
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

    const { anchorEl } = this.state;

    return (
      <>
        <Color
          buttonRef={this.handleButtonRef}
          className={classes.color}
          name={name}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          value={value}
        />
        <Hidden smUp>
          <Dialog
            onClose={onClose}
            onSelect={(color) => {
              onChange(color);
              onClose();
            }}
            open={open}
            value={value}
          />
        </Hidden>
        <Hidden xsDown>
          <Popover
            anchorEl={anchorEl}
            onClose={onClose}
            onSelect={(color) => {
              onChange(color);
              onClose();
            }}
            open={open}
            value={value}
          />
        </Hidden>
      </>
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
