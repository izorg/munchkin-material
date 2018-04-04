import React, { Fragment, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Backdrop } from 'material-ui/Modal';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Portal from 'material-ui/Portal';
import { withStyles } from 'material-ui/styles';
import Hammer from 'hammerjs';
import { noop } from 'lodash';

import InsomniaItem from './InsomniaItem';
import SingleModeItem from './SingleModeItem';
import ThemeItem from './ThemeItem';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 2,
  },

  paper: {
    touchAction: 'pan-y',
  },

  menu: {
    maxWidth: 320,
    width: 'calc(100vw - 56px)',
  },
});

const swipeAreaWidth = 32;

class Component extends PureComponent {
  constructor(props) {
    super(props);

    this.startX = null;

    this.state = {
      maybeSwiping: false,
    };

    this.handlePan = this.handlePan.bind(this);
    this.handlePanStart = this.handlePanStart.bind(this);
    this.handlePanEnd = this.handlePanEnd.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handlePressUp = this.handlePressUp.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);

    this.handleBackdropRef = this.handleBackdropRef.bind(this);
    this.handlePaperRef = this.handlePaperRef.bind(this);
  }

  componentDidMount() {
    const { enable } = this.props;

    this.hammer = new Hammer(document.body, {
      enable,
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }],
        [Hammer.Pan, { direction: Hammer.DIRECTION_ALL }, ['swipe']],
        [Hammer.Press],
      ],
    });

    this.hammer.on('panstart', this.handlePanStart);
    this.hammer.on('panleft panright', this.handlePan);
    this.hammer.on('panend', this.handlePanEnd);
    this.hammer.on('press', this.handlePress);
    this.hammer.on('pressup', this.handlePressUp);
    this.hammer.on('swipeleft', this.handleSwipeLeft);
    this.hammer.on('swiperight', this.handleSwipeRight);
  }

  componentWillReceiveProps(nextProps) {
    const { enable } = nextProps;

    if (this.hammer && this.props.enable !== enable) {
      this.hammer.set({ enable });
    }
  }

  componentWillUnmount() {
    this.hammer.stop();
    this.hammer.destroy();

    this.hammer = null;
  }

  setPosition(translate) {
    const transform = `translate(${translate}px, 0)`;
    const drawerStyle = this.paper.style;

    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;

    const backdropStyle = this.backdrop.style;

    backdropStyle.opacity = 1 + translate / this.paper.clientWidth;
  }

  handlePanStart(event) {
    const { open } = this.props;

    const { center: { x } } = event;

    this.startX = x;

    if (open) {
      this.setState({ maybeSwiping: true });
    } else {
      if (x > swipeAreaWidth) {
        return;
      }

      this.setState({ maybeSwiping: true });
    }
  }

  handlePan(event) {
    const { maybeSwiping } = this.state;
    const { open } = this.props;

    if (!maybeSwiping) {
      return;
    }

    if (open) {
      const { deltaX } = event;

      if (deltaX < 0) {
        this.setPosition(
          Math.min(
            0,
            deltaX +
              (this.startX > this.paper.clientWidth
                ? this.startX - this.paper.clientWidth
                : 0),
          ),
        );
      }
    } else {
      const { center: { x } } = event;

      this.setPosition(Math.min(x - this.paper.clientWidth, 0));
    }
  }

  handlePanEnd(event) {
    const { maybeSwiping } = this.state;

    if (!maybeSwiping) {
      return;
    }

    this.setState({ maybeSwiping: false });

    const { center: { x } } = event;
    const { onClose, onOpen, open } = this.props;

    if (x > this.paper.clientWidth / 2) {
      if (!open) {
        onOpen();
      } else {
        this.setPosition(0);
      }
    } else if (open) {
      onClose();
    } else {
      this.setPosition(-this.paper.clientHeight);
    }
  }

  handlePress(event) {
    const { center: { x } } = event;

    if (x > swipeAreaWidth) {
      return;
    }

    this.setState({ maybeSwiping: true });

    if (!this.props.open) {
      this.setPosition(20 - this.paper.clientWidth);
    }
  }

  handlePressUp() {
    const { maybeSwiping } = this.state;

    if (!maybeSwiping) {
      return;
    }

    this.setState({ maybeSwiping: false });

    this.setPosition(-this.paper.clientWidth);
  }

  handleSwipeRight() {
    const { onOpen, open } = this.props;

    if (this.startX > swipeAreaWidth) {
      return;
    }

    if (!open) {
      this.setState({
        maybeSwiping: false,
      });

      onOpen();
    }
  }

  handleSwipeLeft() {
    const { onClose, open } = this.props;

    if (!open) {
      return;
    }

    this.setState({ maybeSwiping: false });

    onClose();
  }

  handleBackdropRef(node) {
    // eslint-disable-next-line react/no-find-dom-node
    this.backdrop = node ? findDOMNode(node) : null;
  }

  handlePaperRef(node) {
    // eslint-disable-next-line react/no-find-dom-node
    this.paper = node ? findDOMNode(node) : null;
  }

  render() {
    const { classes, onClose, open } = this.props;
    const { maybeSwiping } = this.state;

    return (
      <Fragment>
        <Drawer
          classes={{ paper: classes.paper }}
          disableRestoreFocus
          ModalProps={{
            BackdropProps: {
              ref: this.handleBackdropRef,
            },
          }}
          onClose={onClose}
          open={maybeSwiping || open}
          PaperProps={{
            ref: this.handlePaperRef,
          }}
        >
          <List className={classes.menu} component="div">
            <ThemeItem />
            <SingleModeItem />
            <InsomniaItem />
          </List>
        </Drawer>
        {maybeSwiping && (
          <Portal>
            <Backdrop className={classes.backdrop} invisible open />
          </Portal>
        )}
      </Fragment>
    );
  }
}

Component.propTypes = {
  enable: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
};

Component.defaultProps = {
  enable: false,
  onClose: noop,
  onOpen: noop,
  open: false,
};

export default withStyles(styles)(Component);
