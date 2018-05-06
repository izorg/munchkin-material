import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router/lib/actions';
import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { addPlayer, updatePlayer } from 'munchkin-core/lib/ducks/players';
import createPlayer from 'munchkin-core/lib/utils/createPlayer';
import { MALE } from 'munchkin-core/lib/utils/sex';

import { addPlayerToList } from '../../../ducks/playerList';
import getRandomMaterialColor from '../../../utils/getRandomMaterialColor';

import Component from './Component';

const initialValues = createSelector(
  (state) => state.players,
  (state, ownProps) => ownProps.playerId,
  (players, playerId) => {
    let values = {
      sex: MALE,
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

const submitPlayer = (values) => (dispatch) => {
  const { id, name = '' } = values;

  if (name.trim()) {
    const player = createPlayer(values);

    if (id) {
      dispatch(updatePlayer(player));
    } else {
      dispatch(addPlayer(player));
      dispatch(addPlayerToList(player.id));
    }
  }

  dispatch(goBack());
};

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
      appear: props.appear,
      playerId: props.match.params.id,
    };

    this.handleExited = this.handleExited.bind(this);
    this.renderTransition = this.renderTransition.bind(this);
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

  renderTransition(props) {
    const { appear } = this.state;

    return <Slide {...props} appear={appear} direction="up" />;
  }

  render() {
    const { match } = this.props;
    const { playerId } = this.state;

    return (
      <Dialog
        fullScreen
        hideBackdrop
        onExited={this.handleExited}
        open={Boolean(match)}
        TransitionComponent={this.renderTransition}
      >
        <ConnectedComponent playerId={playerId} />
      </Dialog>
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
