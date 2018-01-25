import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import Transition from '../../../../components/fab/Transition';

import CombatButton from './CombatButton';
import Page from './Page';

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

  componentWillReceiveProps(nextProps) {
    const match = nextProps.match || this.props.match;

    if (match && match.params.id !== this.state.playerId) {
      this.setState({
        playerId: match.params.id,
      });
    }
  }

  render() {
    const { appear, match } = this.props;
    const { playerId } = this.state;

    return (
      <Fragment>
        <Slide
          appear={appear}
          direction="left"
          in={Boolean(match)}
          mountOnEnter
          unmountOnExit
        >
          <Page />
        </Slide>
        <Transition
          appear={appear}
          in={Boolean(match) && match.isExact}
        >
          <CombatButton appear={appear} playerId={playerId} />
        </Transition>
      </Fragment>
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

export default PlayerScreen;
