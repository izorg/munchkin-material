import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';

import Color from './Color';
import Dialog from './Dialog';
import Popover from './Popover';

const styles = {
  color: {
    marginLeft: -6,
  },
};

class ColorPicker extends PureComponent {
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
      <Fragment>
        <Color
          className={classes.color}
          buttonRef={this.handleButtonRef}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          name={name}
          value={value}
        />
        <Hidden smUp>
          <Dialog
            onClose={onClose}
            open={open}
            onSelect={(color) => {
              onChange(color);
              onClose();
            }}
            value={value}
          />
        </Hidden>
        <Hidden xsDown>
          <Popover
            anchorEl={anchorEl}
            onClose={onClose}
            open={open}
            onSelect={(color) => {
              onChange(color);
              onClose();
            }}
            value={value}
          />
        </Hidden>
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
