import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import CombatButton from './CombatButton';
import Page from './Page';

class PlayerScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerId: props.match.params.id,
    };
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
    const { playerId } = this.state;

    return (
      <>
        <Page playerId={playerId} />
        <CombatButton playerId={playerId} />
      </>
    );
  }
}

PlayerScreen.propTypes = {
  match: PropTypes.object,
};

PlayerScreen.defaultProps = {
  match: null,
};

export default compose(hot(module))(PlayerScreen);
