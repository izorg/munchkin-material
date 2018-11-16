import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
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
  onSubmit: (values, form) => (dispatch) => {
    const { dirty } = form.getState();

    if (dirty) {
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
    }

    dispatch(goBack());
  },
};

export default compose(
  shouldUpdate((props, { playerId }) => playerId !== undefined),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    (stateProps, dispatchProps, { playerId, ...ownProps }) => ({
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
    }),
  ),
)(Component);
