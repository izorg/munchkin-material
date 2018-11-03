import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import Dialog from './Dialog';

class PlayerFormScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appear: props.appear,
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
    const { match } = this.props;
    const { appear, playerId } = this.state;

    return <Dialog appear={appear} open={Boolean(match)} playerId={playerId} />;
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

export default hot(module)(PlayerFormScreen);
