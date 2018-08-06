import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import Transition from 'react-transition-group/Transition';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';

import FadeUp from '../../../components/FadeUp';

import HelperButton from './HelperButton';
import HelperSelector from './HelperSelector';
import Page from './Page';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.modal - 1,
  },

  transition: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    outline: 'none',
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
    const { appear } = this.state;

    if (!appear) {
      this.setState({
        appear: true,
      });
    }
  }

  render() {
    const { classes, match, theme } = this.props;
    const { appear } = this.state;

    const inProp = Boolean(match);

    return (
      <Modal className={classes.root} disablePortal hideBackdrop open={inProp}>
        <Transition
          appear={appear}
          in={inProp}
          mountOnEnter
          onExited={this.handleExited}
          timeout={{
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
          }}
          unmountOnExit
        >
          <div className={classes.transition}>
            <FadeUp appear={appear} in={inProp} mountOnEnter unmountOnExit>
              <Page />
            </FadeUp>

            <Zoom
              appear={appear}
              in={inProp}
              style={{
                transitionDelay: inProp
                  ? theme.transitions.duration.leavingScreen
                  : 0,
              }}
            >
              <HelperButton />
            </Zoom>

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

export default compose(
  hot(module),
  withStyles(styles, { withTheme: true }),
)(CombatScreen);
