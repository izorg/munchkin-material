import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import Transition from 'react-transition-group/Transition';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';

import FabTransition from '../../../components/fab/Transition';

import HelperButton from './HelperButton';
import HelperSelector from './HelperSelector';
import Page from './Page';

const styles = (theme) => ({
  root: {
    zIndex: theme.zIndex.modal - 1,
  },

  transition: {
    height: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
  },
});

class CombatScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appear: props.appear,
    };

    this.handleExited = this.handleExited.bind(this);
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
      <Modal className={classes.root} hideBackdrop open={Boolean(match)}>
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
            <FabTransition appear={appear} in={Boolean(match)}>
              <HelperButton />
            </FabTransition>
            <HelperSelector />
          </div>
        </Transition>
      </Modal>
    );
  }
}

CombatScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

CombatScreen.defaultProps = {
  match: null,
};

export default compose(hot(module), withStyles(styles, { withTheme: true }))(
  CombatScreen,
);
