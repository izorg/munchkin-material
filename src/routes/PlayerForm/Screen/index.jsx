import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';
import { MALE } from 'munchkin-core/lib/utils/gender';

import { submitPlayer } from '../../../actions';
import getRandomMaterialColor from '../../../utils/getRandomMaterialColor';

import Component from './Component';

const initialValues = createSelector(
  (state) => state.players,
  (state, ownProps) => ownProps.playerId,
  (players, playerId) => {
    let values = {
      gender: MALE,
    };

    if (playerId) {
      const selectedPlayer = players[playerId];

      if (selectedPlayer) {
        values = {
          ...values,
          ...selectedPlayer,
        };
      }
    } else {
      values = {
        ...values,
        color: getRandomMaterialColor(),
      };
    }

    return values;
  },
);

const mapStateToProps = createStructuredSelector({
  initialValues,
  newPlayer: (state, ownProps) => !ownProps.playerId,
});

const mapDispatchToProps = {
  onSubmit: submitPlayer,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(
  Component,
);

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
    const { playerId } = this.state;

    return (
      <Slide
        appear={appear}
        direction="up"
        in={Boolean(match)}
        mountOnEnter
        unmountOnExit
      >
        <ConnectedComponent playerId={playerId} />
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

export default hot(module)(PlayerFormScreen);
