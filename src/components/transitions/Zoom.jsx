import React, { cloneElement, Component } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core';
import { duration } from '@material-ui/core/styles/transitions';
import {
  getTransitionProps,
  reflow,
} from '@material-ui/core/transitions/utils';
import { noop } from 'lodash/fp';

const styles = {
  entering: {
    transform: 'scale(1)',
    WebkitTransform: 'scale(1)',
  },

  entered: {
    transform: 'scale(1)',
    WebkitTransform: 'scale(1)',
  },
};

class Zoom extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleEnter(node) {
    const { onEnter, theme } = this.props;

    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps(this.props, {
      mode: 'enter',
    });

    // eslint-disable-next-line no-param-reassign
    node.style.webkitTransition = theme.transitions.create(
      '-webkit-transform',
      transitionProps,
    );

    // eslint-disable-next-line no-param-reassign
    node.style.transition = theme.transitions.create(
      'transform',
      transitionProps,
    );

    onEnter(node);
  }

  handleExit(node) {
    const { onExit, theme } = this.props;
    const transitionProps = getTransitionProps(this.props, {
      mode: 'exit',
    });

    // eslint-disable-next-line no-param-reassign
    node.style.webkitTransition = theme.transitions.create(
      '-webkit-transform',
      transitionProps,
    );

    // eslint-disable-next-line no-param-reassign
    node.style.transition = theme.transitions.create(
      'transform',
      transitionProps,
    );

    onExit(node);
  }

  render() {
    const {
      children,
      onEnter,
      onExit,
      style: styleProp,
      theme,
      ...rest
    } = this.props;

    const style = {
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {}),
    };

    return (
      <Transition
        appear
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        {...rest}
      >
        {(state, childProps) =>
          cloneElement(children, {
            style: {
              transform: 'scale(0)',
              WebkitTransform: 'scale(0)',
              willChange: 'transform',
              ...styles[state],
              ...style,
            },
            ...childProps,
          })
        }
      </Transition>
    );
  }
}

Zoom.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

Zoom.defaultProps = {
  children: null,
  onEnter: noop,
  onExit: noop,
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withTheme()(Zoom);
