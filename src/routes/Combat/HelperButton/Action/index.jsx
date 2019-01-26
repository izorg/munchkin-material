import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { RootRef } from '@material-ui/core';
import { SpeedDialAction } from '@material-ui/lab';
import Hammer from 'hammerjs';
import { delay, noop } from 'lodash/fp';

class HelperButtonAction extends Component {
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

    this.hammer.on('tap', () => delay(10, onClick));
  }

  removeHammer() {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();

      this.hammer = null;
    }
  }

  render() {
    return (
      <RootRef rootRef={this.buttonRef}>
        <SpeedDialAction {...this.props} onClick={noop} />
      </RootRef>
    );
  }
}

HelperButtonAction.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HelperButtonAction;
