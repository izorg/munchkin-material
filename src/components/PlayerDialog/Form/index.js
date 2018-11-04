import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { createSelector, createStructuredSelector } from 'reselect';
import { addPlayer, createPlayer, MALE, updatePlayer } from 'munchkin-core';
import { get, map } from 'lodash/fp';

import { addPlayerToList } from '../../../ducks/playerList';
import getRandomMaterialColor from '../../../utils/getRandomMaterialColor';

import Component from './Component';

const initialValues = createSelector(
  (state, { playerId }) => playerId,
  get('players'),
  (playerId, players) =>
    playerId
      ? players[playerId]
      : {
          color: getRandomMaterialColor(map('color', players)),
          sex: MALE,
        },
);

const mapStateToProps = createStructuredSelector({
  initialValues,
});

const mapDispatchToProps = {
  onSubmit: (values) => (dispatch) => {
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
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, { playerId, ...ownProps }) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
  }),
)(Component);
