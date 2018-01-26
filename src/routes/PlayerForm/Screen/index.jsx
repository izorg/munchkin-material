import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';

import Component from './Component';

class PlayerFormScreen extends PureComponent {
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
    return (
      <Slide
        appear={appear}
        direction="up"
        in={Boolean(match)}
        mountOnEnter
        unmountOnExit
      >
        <Component />
      </Slide>
    );
  }
}

PlayerFormScreen.childContextTypes = {
  playerId: PropTypes.string,
};

PlayerFormScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

PlayerFormScreen.defaultProps = {
  match: null,
};

export default PlayerFormScreen;
