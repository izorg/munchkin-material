import React, { Component, Fragment } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import Backdrop from '@material-ui/core/Backdrop';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash/fp';

const styles = (theme) => ({
  backdrop: {
    position: 'absolute',
    zIndex: 'auto',
  },

  enter: {
    opacity: 0,
    transform: 'translateY(8%)',
    willChange: 'opacity, transform',
  },

  enterActive: {
    opacity: 1,
    transform: 'translateY(0);',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  leave: {
    opacity: 1,
    transform: 'translateY(0)',
    willChange: 'opacity, transform',
  },

  leaveActive: {
    opacity: 0,
    transform: 'translateY(8%)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

class FadeUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backdrop: false,
    };

    this.handleEnter = this.handleEnter.bind(this);
    this.handleEntered = this.handleEntered.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleExited = this.handleExited.bind(this);
  }

  hideBackdrop() {
    this.setState({ backdrop: false });
  }

  showBackdrop() {
    this.setState({ backdrop: true });
  }

  handleEnter(...args) {
    const { onEnter } = this.props;

    this.showBackdrop();

    onEnter(...args);
  }

  handleEntered(...args) {
    const { onEntered } = this.props;

    this.hideBackdrop();

    onEntered(...args);
  }

  handleExit(...args) {
    const { onExit } = this.props;

    this.showBackdrop();

    onExit(...args);
  }

  handleExited(...args) {
    const { onExited } = this.props;

    this.hideBackdrop();

    onExited(...args);
  }

  render() {
    const { classes, theme, ...props } = this.props;
    const { backdrop } = this.state;

    return (
      <Fragment>
        <CSSTransition
          {...props}
          classNames={{
            appear: classes.enter,
            appearActive: classes.enterActive,
            enter: classes.enter,
            enterActive: classes.enterActive,
            exit: classes.leave,
            exitActive: classes.leaveActive,
          }}
          onEnter={this.handleEnter}
          onEntered={this.handleEntered}
          onExit={this.handleExit}
          onExited={this.handleExited}
          timeout={{
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
          }}
        />
        {backdrop && <Backdrop className={classes.backdrop} invisible open />}
      </Fragment>
    );
  }
}

FadeUp.defaultProps = {
  onEnter: noop,
  onEntered: noop,
  onExit: noop,
  onExited: noop,
};

export default withStyles(styles, { withTheme: true })(FadeUp);
