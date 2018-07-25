import React, { Fragment, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Portal from '@material-ui/core/Portal';
import { withStyles } from '@material-ui/core/styles';
import Hammer from 'hammerjs';
import { noop } from 'lodash';

import InsomniaItem from './InsomniaItem';
import RateItem from './RateItem';
import ShareItem from './ShareItem';
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

class HomeMenuDrawer extends PureComponent {
  constructor(props) {
    super(props);

    this.animationTimeout = null;
    this.startX = null;

    this.state = {
      animation: false,
      maybeSwiping: false,
    };

    this.handlePan = this.handlePan.bind(this);
    this.handlePanEnd = this.handlePanEnd.bind(this);
    this.handlePanMove = this.handlePanMove.bind(this);
    this.handlePanStart = this.handlePanStart.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handlePressUp = this.handlePressUp.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);

    this.handleBackdropRef = this.handleBackdropRef.bind(this);
    this.handlePaperRef = this.handlePaperRef.bind(this);

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { enable } = this.props;

    this.hammer = new Hammer(document.body, {
      enable,
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
        [
          Hammer.Pan,
          {
            event: 'panh',
            direction: Hammer.DIRECTION_HORIZONTAL,
            threshold: 0,
          },
          ['swipe'],
        ],
        [
          Hammer.Pan,
          { event: 'panv', direction: Hammer.DIRECTION_VERTICAL, threshold: 0 },
          ['panh'],
        ],
        [Hammer.Press, { time: 151 }],
      ],
    });

    this.hammer.on('panh panv', this.handlePan);
    this.hammer.on('panhstart', this.handlePanStart);
    this.hammer.on('panhmove', this.handlePanMove);
    this.hammer.on('panhend panvend', this.handlePanEnd);
    this.hammer.on('press', this.handlePress);
    this.hammer.on('pressup', this.handlePressUp);
    this.hammer.on('swipeleft', this.handleSwipeLeft);
    this.hammer.on('swiperight', this.handleSwipeRight);
  }

  componentDidUpdate(prevProps) {
    const { enable } = this.props;

    if (this.hammer && enable !== prevProps.enable) {
      this.hammer.set({ enable });
    }
  }

  componentWillUnmount() {
    this.hammer.stop();
    this.hammer.destroy();

    this.hammer = null;

    clearTimeout(this.animationTimeout);
  }

  setPosition(translate, duration = 0) {
    const transform = `translate(${translate}px, 0)`;
    const drawerStyle = this.paper.style;

    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;
    drawerStyle.webkitTransitionDuration = `${duration}ms`;
    drawerStyle.transitionDuration = `${duration}ms`;

    const backdropStyle = this.backdrop.style;

    backdropStyle.opacity = 1 + translate / this.paper.clientWidth;
    backdropStyle.transitionDuration = '0ms';

    clearTimeout(this.animationTimeout);
    this.setState({ animation: false });

    if (duration) {
      this.setState({ animation: true });

      this.animationTimeout = setTimeout(
        () => this.setState({ animation: false }),
        duration,
      );
    }
  }

  handlePan(event) {
    const { open } = this.props;
    const { maybeSwiping } = this.state;

    if (!maybeSwiping || open || event.srcEvent.type !== 'pointercancel') {
      return;
    }

    this.setState({ maybeSwiping: false });
  }

  handlePanStart(event) {
    const { open } = this.props;

    const {
      center: { x },
    } = event;

    this.startX = x;

    if (open) {
      this.setState({ maybeSwiping: true });
    } else {
      if (x > swipeAreaWidth) {
        return;
      }

      this.setState({ maybeSwiping: true });
      this.setPosition(Math.max(x, 20) - this.paper.clientWidth);
    }
  }

  handlePanMove(event) {
    const { maybeSwiping } = this.state;
    const { open } = this.props;

    if (!maybeSwiping) {
      return;
    }

    const {
      center: { x },
      deltaX,
    } = event;

    if (open) {
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
      this.setPosition(Math.min(Math.max(x, 20) - this.paper.clientWidth, 0));
    }
  }

  handlePanEnd(event) {
    const { maybeSwiping } = this.state;

    if (!maybeSwiping) {
      return;
    }

    this.setState({ maybeSwiping: false });

    const { onClose, onOpen, open, theme } = this.props;
    const { deltaX } = event;

    if (open) {
      if (-deltaX >= this.paper.clientWidth / 2) {
        onClose();
      } else {
        this.setPosition(0, theme.transitions.duration.leavingScreen);
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (deltaX >= this.paper.clientWidth / 2) {
        onOpen();
      } else {
        this.setPosition(
          -this.paper.clientWidth,
          theme.transitions.duration.leavingScreen,
        );
      }
    }
  }

  handlePress(event) {
    const {
      center: { x },
      srcEvent: { type },
    } = event;

    const { open, theme } = this.props;

    if (x > swipeAreaWidth || open || type === 'pointerup') {
      return;
    }

    this.setState({ maybeSwiping: true });

    this.setPosition(
      20 - this.paper.clientWidth,
      theme.transitions.duration.enteringScreen,
    );
  }

  handlePressUp() {
    const { maybeSwiping } = this.state;
    const { open, theme } = this.props;

    if (!maybeSwiping || open) {
      return;
    }

    this.setState({ maybeSwiping: false });

    this.setPosition(
      -this.paper.clientWidth,
      theme.transitions.duration.leavingScreen,
    );
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

  handleClose() {
    const { onClose, open } = this.props;

    if (open) {
      onClose();
    }
  }

  render() {
    const { classes, open } = this.props;
    const { animation, maybeSwiping } = this.state;

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
          onClose={this.handleClose}
          open={maybeSwiping || open}
          PaperProps={{
            ref: this.handlePaperRef,
          }}
        >
          <List className={classes.menu} component="div">
            <ThemeItem />
            <SingleModeItem />
            <InsomniaItem />
            <RateItem />
            <ShareItem />
          </List>
        </Drawer>

        {(animation || maybeSwiping) && (
          <Portal>
            <Backdrop
              appear={false}
              className={classes.backdrop}
              invisible
              open
            />
          </Portal>
        )}
      </Fragment>
    );
  }
}

HomeMenuDrawer.propTypes = {
  enable: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
};

HomeMenuDrawer.defaultProps = {
  enable: false,
  onClose: noop,
  onOpen: noop,
  open: false,
};

export default withStyles(styles, { withTheme: true })(HomeMenuDrawer);
