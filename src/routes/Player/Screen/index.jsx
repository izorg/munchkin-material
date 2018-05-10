import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import Transition from 'react-transition-group/Transition';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';

import FabTransition from '../../../components/fab/Transition';

import CombatButton from './CombatButton';
import Page from './Page';

const styles = {
  transition: {
    height: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
  },
};

class PlayerScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appear: props.appear,
      playerId: props.match.params.id,
    };

    this.handleExited = this.handleExited.bind(this);
  }

  getChildContext() {
    const { playerId } = this.state;

    return { playerId };
  }

  componentWillReceiveProps(nextProps) {
    const match = nextProps.match || this.props.match;

    if (match && match.params.id !== this.state.playerId) {
      this.setState({
        playerId: match.params.id,
      });
    }
  }

  handleExited() {
    if (!this.state.appear) {
      this.setState({
        appear: true,
      });
    }
  }

  render() {
    const { classes, match, theme } = this.props;
    const { appear } = this.state;

    return (
      <Modal hideBackdrop open={Boolean(match)}>
        <Transition
          appear={appear}
          in={Boolean(match)}
          mountOnEnter
          onExited={this.handleExited}
          timeout={{
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
          }}
          unmountOnExit
        >
          <div className={classes.transition}>
            <Slide
              appear={appear}
              direction="left"
              in={Boolean(match)}
              mountOnEnter
              unmountOnExit
            >
              <Page />
            </Slide>
            <FabTransition appear={appear} in={Boolean(match) && match.isExact}>
              <CombatButton />
            </FabTransition>
          </div>
        </Transition>
      </Modal>
    );
  }
}

PlayerScreen.childContextTypes = {
  playerId: PropTypes.string,
};

PlayerScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

PlayerScreen.defaultProps = {
  match: null,
};

export default compose(hot(module), withStyles(styles, { withTheme: true }))(
  PlayerScreen,
);
