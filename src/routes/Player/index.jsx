import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';

import FadeUp from '../../components/FadeUp';
import ModalScreen from '../../components/ModalScreen';
import { ios } from '../../utils/platforms';

import CombatButton from './CombatButton';
import Page from './Page';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    outline: 'none',
  },
};

const Transition = ios
  ? (props) => <Slide direction="left" {...props} />
  : FadeUp;

class PlayerScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerId: props.match.params.id,
    };
  }

  getChildContext() {
    const { playerId } = this.state;

    return { playerId };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { match } = nextProps;

    if (match && match.params.id !== prevState.playerId) {
      return {
        playerId: match.params.id,
      };
    }

    return null;
  }

  render() {
    const { appear, classes, fabAppear, match, theme } = this.props;
    const { playerId } = this.state;

    const inProp = Boolean(match) && match.isExact;

    return (
      <ModalScreen className={classes.root} disablePortal hideBackdrop open>
        <div className={classes.content}>
          <Transition
            appear={appear}
            in={Boolean(match)}
            mountOnEnter
            unmountOnExit
          >
            <Page playerId={playerId} />
          </Transition>
          <Zoom
            appear={fabAppear}
            in={inProp}
            style={{
              transitionDelay: inProp
                ? theme.transitions.duration.leavingScreen
                : 0,
            }}
          >
            <CombatButton />
          </Zoom>
        </div>
      </ModalScreen>
    );
  }
}

PlayerScreen.childContextTypes = {
  playerId: PropTypes.string,
};

PlayerScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  fabAppear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

PlayerScreen.defaultProps = {
  match: null,
};

export default compose(
  hot(module),
  withStyles(styles),
)(PlayerScreen);
