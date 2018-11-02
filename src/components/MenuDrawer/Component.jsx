import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import List from '@material-ui/core/List';
import Drawer, {
  getAnchor,
  isHorizontal,
} from '@material-ui/core/Drawer/Drawer';
import { withStyles } from '@material-ui/core/styles';
import { duration } from '@material-ui/core/styles/transitions';
import { getTransitionProps } from '@material-ui/core/transitions/utils';
import Hammer from 'hammerjs';
import { throttle } from 'lodash';

import InsomniaItem from './InsomniaItem';
import LevelLimitItem from './LevelLimitItem';
import PrivacyItem from './PrivacyItem';
import RateItem from './RateItem';
import ShareItem from './ShareItem';
import SingleModeItem from './SingleModeItem';
import ThemeItem from './ThemeItem';
import VersionItem from './VersionItem';

const styles = {
  paper: {
    touchAction: 'pan-y',
  },

  menu: {
    maxWidth: 320,
    width: 'calc(100vw - 56px)',

    '@supports(padding: env(safe-area-inset-left))': {
      maxWidth: 'calc(320px + env(safe-area-inset-left))',
      paddingLeft: 'env(safe-area-inset-left)',
    },
  },
};

const hysteresis = 0.5;
const minFlingVelocity = 0.3;
const swipeAreaWidth = 20;

class HomeMenuDrawer extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.maybeSwiping === 'undefined') {
      return {
        maybeSwiping: false,
        open: nextProps.open,
      };
    }

    if (!nextProps.open && prevState.open) {
      return {
        maybeSwiping: false,
        open: nextProps.open,
      };
    }

    return {
      open: nextProps.open,
    };
  }

  constructor(props) {
    super(props);

    this.state = {};

    this.handleBackdropRef = this.handleBackdropRef.bind(this);
    this.handlePaperRef = this.handlePaperRef.bind(this);

    this.handlePanStart = this.handlePanStart.bind(this);
    this.handlePanMove = throttle(this.handlePanMove.bind(this), 30, {
      leading: false,
    });
    this.handlePanEnd = this.handlePanEnd.bind(this);
    this.handlePanCancel = this.handlePanCancel.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handlePressUp = this.handlePressUp.bind(this);
  }

  componentDidMount() {
    this.addHammer();
  }

  componentWillUnmount() {
    this.removeHammer();
  }

  getMaxTranslate() {
    return isHorizontal(this.props)
      ? this.paperRef.clientWidth
      : this.paperRef.clientHeight;
  }

  getTranslate(current) {
    const { open } = this.props;

    if (open) {
      if (current >= this.getMaxTranslate()) {
        return 0;
      }

      if (this.start < this.getMaxTranslate()) {
        return Math.max(this.start - current, 0);
      }
    }

    return Math.min(
      Math.max(this.getMaxTranslate() - current, 0),
      this.getMaxTranslate() - (this.startPress ? swipeAreaWidth : 0),
    );
  }

  setPosition(translate, options = {}) {
    const { mode = null, changeTransition = true } = options;
    const { theme, transitionDuration } = this.props;

    const anchor = getAnchor(this.props);

    const rtlTranslateMultiplier =
      ['right', 'bottom'].indexOf(anchor) !== -1 ? 1 : -1;

    const transform = isHorizontal(this.props)
      ? `translate(${rtlTranslateMultiplier * translate}px, 0)`
      : `translate(0, ${rtlTranslateMultiplier * translate}px)`;

    const drawerStyle = this.paperRef.style;

    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;

    let transition = '';

    if (mode) {
      transition = theme.transitions.create(
        'all',
        getTransitionProps({ timeout: transitionDuration }, { mode }),
      );
    }

    if (changeTransition) {
      drawerStyle.webkitTransition = transition;
      drawerStyle.transition = transition;
    }

    const backdropStyle = this.backdropRef.style;

    backdropStyle.opacity = 1 - translate / this.getMaxTranslate();

    if (changeTransition) {
      backdropStyle.webkitTransition = transition;
      backdropStyle.transition = transition;
    }
  }

  handlePanStart(event) {
    if (event.srcEvent.type === 'pointercancel') {
      this.handlePanCancel(event);

      return;
    }

    const { open } = this.props;
    const { maybeSwiping } = this.state;

    const anchor = getAnchor(this.props);

    const currentX =
      anchor === 'right'
        ? document.body.offsetWidth - event.center.x
        : event.center.x;

    const currentY =
      anchor === 'bottom'
        ? window.innerHeight - event.center.y
        : event.center.y;

    const current = isHorizontal(this.props) ? currentX : currentY;

    this.start = current;

    if (!open && current > swipeAreaWidth) {
      return;
    }

    if (!maybeSwiping) {
      this.startPress = false;
    }

    this.setState({ maybeSwiping: true });

    if (!open && this.paperRef) {
      // The ref may be null when a parent component updates while swiping.
      this.setPosition(this.getMaxTranslate() - swipeAreaWidth, {
        changeTransition: false,
      });
    }
  }

  handlePanMove(event) {
    const { maybeSwiping } = this.state;

    // the ref may be null when a parent component updates while swiping
    if (!maybeSwiping || !this.paperRef) {
      return;
    }

    const anchor = getAnchor(this.props);
    const horizontalSwipe = isHorizontal(this.props);

    const currentX =
      anchor === 'right'
        ? document.body.offsetWidth - event.center.x
        : event.center.x;
    const currentY =
      anchor === 'bottom'
        ? window.innerHeight - event.center.y
        : event.center.y;

    if (event.additionalEvent === 'panleft' && currentX > swipeAreaWidth) {
      this.startPress = false;
    }

    const translate = this.getTranslate(horizontalSwipe ? currentX : currentY);

    this.setPosition(translate);
  }

  handlePanEnd(event) {
    const { onClose, onOpen, open } = this.props;
    const { maybeSwiping } = this.state;

    if (!maybeSwiping) {
      return;
    }

    this.setState({ maybeSwiping: false });

    const anchor = getAnchor(this.props);

    let current;
    let velocity;

    if (isHorizontal(this.props)) {
      current =
        anchor === 'right'
          ? document.body.offsetWidth - event.center.x
          : event.center.x;

      velocity = event.overallVelocityX;
    } else {
      current =
        anchor === 'bottom'
          ? window.innerHeight - event.center.y
          : event.center.y;

      velocity = event.overallVelocityY;
    }

    const translateRatio = this.getTranslate(current) / this.getMaxTranslate();

    if (open) {
      if (
        (velocity < -minFlingVelocity && current <= this.getMaxTranslate()) ||
        translateRatio > hysteresis
      ) {
        onClose();
      } else {
        // Reset the position, the swipe was aborted.
        this.setPosition(0, {
          mode: 'exit',
        });
      }

      return;
    }

    if (velocity > minFlingVelocity || 1 - translateRatio > hysteresis) {
      onOpen();
    } else {
      // Reset the position, the swipe was aborted.
      this.setPosition(this.getMaxTranslate(), {
        mode: 'enter',
      });
    }
  }

  handlePanCancel() {
    const { open } = this.props;
    const { maybeSwiping } = this.state;

    if (!maybeSwiping) {
      return;
    }

    this.setState({ maybeSwiping: false });

    if (open) {
      // Reset the position, the swipe was aborted.
      this.setPosition(0, {
        mode: 'exit',
      });

      return;
    }

    // Reset the position, the swipe was aborted.
    this.setPosition(this.getMaxTranslate(), {
      mode: 'enter',
    });
  }

  handlePress(event) {
    if (event.srcEvent.type === 'pointerup') {
      return;
    }

    const { open } = this.props;
    const { maybeSwiping } = this.state;

    const anchor = getAnchor(this.props);

    let current;

    if (isHorizontal(this.props)) {
      current =
        anchor === 'right'
          ? document.body.offsetWidth - event.center.x
          : event.center.x;
    } else {
      current =
        anchor === 'bottom'
          ? window.innerHeight - event.center.y
          : event.center.y;
    }

    if (maybeSwiping || open || current > swipeAreaWidth) {
      return;
    }

    this.startPress = true;

    this.setState({ maybeSwiping: true });

    event.preventDefault();

    if (this.paperRef) {
      // The ref may be null when a parent component updates while swiping.
      this.setPosition(this.getMaxTranslate() - swipeAreaWidth, {
        changeTransition: false,
      });
    }
  }

  handlePressUp(event) {
    const { open } = this.props;
    const { maybeSwiping } = this.state;

    if (!maybeSwiping) {
      return;
    }

    event.preventDefault();

    this.setState({ maybeSwiping: false });

    if (open) {
      // Reset the position, the swipe was aborted.
      this.setPosition(0, {
        mode: 'exit',
      });

      return;
    }

    // Reset the position, the swipe was aborted.
    this.setPosition(this.getMaxTranslate(), {
      mode: 'enter',
    });
  }

  handleBackdropRef(ref) {
    // eslint-disable-next-line react/no-find-dom-node
    this.backdropRef = ref ? findDOMNode(ref) : null;
  }

  handlePaperRef(ref) {
    // eslint-disable-next-line react/no-find-dom-node
    this.paperRef = ref ? findDOMNode(ref) : null;
  }

  addHammer() {
    this.hammer = new Hammer(document.body, {
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL, threshold: 3 }],
        [Hammer.Press, { time: 51 }],
      ],
    });

    this.hammer.on('panstart', this.handlePanStart);
    this.hammer.on('panmove', this.handlePanMove);
    this.hammer.on('panend', this.handlePanEnd);
    this.hammer.on('pancancel', this.handlePanCancel);
    this.hammer.on('press', this.handlePress);
    this.hammer.on('pressup', this.handlePressUp);
  }

  removeHammer() {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();

      this.hammer = null;
    }
  }

  render() {
    const { classes, onOpen, open, ...rest } = this.props;
    const { maybeSwiping } = this.state;

    return (
      <Drawer
        classes={{
          paper: classes.paper,
        }}
        ModalProps={{
          BackdropProps: {
            ref: this.handleBackdropRef,
          },
        }}
        open={open || maybeSwiping}
        PaperProps={{
          style: {
            pointerEvents: !open || maybeSwiping ? 'none' : '',
          },
          ref: this.handlePaperRef,
        }}
        {...rest}
      >
        <List className={classes.menu} component="div">
          <ThemeItem />
          <SingleModeItem />
          <LevelLimitItem />
          <InsomniaItem />
          <RateItem />
          <ShareItem />
          <PrivacyItem />
          <VersionItem />
        </List>
      </Drawer>
    );
  }
}

HomeMenuDrawer.defaultProps = {
  anchor: 'left',
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withStyles(styles, { withTheme: true })(HomeMenuDrawer);
