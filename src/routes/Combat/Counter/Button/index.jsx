import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { IconButton, RootRef } from '@material-ui/core';
import Hammer from 'hammerjs';

class CounterButton extends Component {
  constructor(props) {
    super(props);

    this.buttonRef = createRef();
  }

  componentDidMount() {
    this.addHammer();
  }

  componentWillUnmount() {
    this.removeHammer();
  }

  addHammer() {
    const { onClick } = this.props;

    this.hammer = new Hammer(this.buttonRef.current, {
      recognizers: [[Hammer.Tap]],
    });

    this.hammer.on('tap', onClick);
  }

  removeHammer() {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();

      this.hammer = null;
    }
  }

  render() {
    const { onClick, ...rest } = this.props;

    return (
      <RootRef rootRef={this.buttonRef}>
        <IconButton {...rest} />
      </RootRef>
    );
  }
}

CounterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CounterButton;
