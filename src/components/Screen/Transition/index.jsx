import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core';
import { duration } from '@material-ui/core/styles/transitions';
import {
  getTransitionProps,
  reflow,
} from '@material-ui/core/transitions/utils';
import { noop } from 'lodash/fp';

class ScreenTransition extends Component {
  constructor() {
    super();

    this.handleEnter = this.handleEnter.bind(this);
    this.handleEntered = this.handleEntered.bind(this);
    this.handleEntering = this.handleEntering.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleExited = this.handleExited.bind(this);
    this.handleExiting = this.handleExiting.bind(this);
  }

  handleEnter(node) {
    const { onEnter } = this.props;

    reflow(node);

    /* eslint-disable no-param-reassign */
    node.style.willChange = 'opacity, transform';

    node.style.webkitTransform = 'translateY(8%)';
    node.style.transform = 'translateY(8%)';
    node.style.opacity = 0;
    /* eslint-enable */

    onEnter(node);
  }

  handleEntering(node) {
    const { onEntering, theme } = this.props;

    const transitionProps = {
      ...getTransitionProps(this.props, {
        mode: 'enter',
      }),
      easing: theme.transitions.easing.easeOut,
    };

    /* eslint-disable no-param-reassign */
    node.style.webkitTransition = theme.transitions.create(
      ['opacity', '-webkit-transform'],
      transitionProps,
    );

    node.style.transition = theme.transitions.create(
      ['opacity', 'transform'],
      transitionProps,
    );

    node.style.webkitTransform = 'translateY(0)';
    node.style.transform = 'translateY(0)';
    node.style.opacity = 1;
    /* eslint-enable */

    onEntering(node);
  }

  handleEntered(node) {
    const { onEntered } = this.props;

    /* eslint-disable no-param-reassign */
    node.style.willChange = '';

    node.style.webkitTransition = '';
    node.style.transition = '';

    node.style.webkitTransform = '';
    node.style.transform = '';
    node.style.opacity = '';
    /* eslint-enable */

    onEntered(node);
  }

  handleExit(node) {
    const { onExit } = this.props;

    /* eslint-disable no-param-reassign */
    node.style.willChange = 'opacity, transform';

    node.style.webkitTransform = 'translateY(0)';
    node.style.transform = 'translateY(0)';
    node.style.opacity = 1;
    /* eslint-enable */

    onExit(node);
  }

  handleExiting(node) {
    const { onExiting, theme } = this.props;

    const transitionProps = {
      ...getTransitionProps(this.props, {
        mode: 'exit',
      }),
      easing: theme.transitions.easing.sharp,
    };

    /* eslint-disable no-param-reassign */
    node.style.webkitTransition = theme.transitions.create(
      ['opacity', '-webkit-transform'],
      transitionProps,
    );

    node.style.transition = theme.transitions.create(
      ['opacity', 'transform'],
      transitionProps,
    );

    node.style.webkitTransform = 'translateY(8%)';
    node.style.transform = 'translateY(8%)';
    node.style.opacity = 0;
    /* eslint-enable */

    onExiting(node);
  }

  handleExited(node) {
    const { onExited } = this.props;

    /* eslint-disable no-param-reassign */
    node.style.willChange = '';

    node.style.webkitTransition = '';
    node.style.transition = '';

    node.style.webkitTransform = '';
    node.style.transform = '';
    node.style.opacity = '';
    /* eslint-enable */

    onExited(node);
  }

  render() {
    const {
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      theme,
      ...rest
    } = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        onExited={this.handleExited}
        onExiting={this.handleExiting}
        {...rest}
      />
    );
  }
}

ScreenTransition.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

ScreenTransition.defaultProps = {
  children: null,
  onEnter: noop,
  onEntered: noop,
  onEntering: noop,
  onExit: noop,
  onExited: noop,
  onExiting: noop,
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withTheme()(ScreenTransition);
