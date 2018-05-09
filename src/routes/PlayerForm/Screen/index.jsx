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

  componentWillReceiveProps(nextProps) {
    const match = nextProps.match || this.props.match;

    if (match && match.params.id !== this.state.playerId) {
      this.setState({
        playerId: match.params.id,
      });
    }
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
