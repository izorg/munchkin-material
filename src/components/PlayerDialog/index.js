import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { addPlayer, createPlayer, MALE, updatePlayer } from 'munchkin-core';
import { flow, get, isUndefined, map, negate } from 'lodash/fp';

import { addPlayerToList } from '../../ducks/playerList';
import { getQuery } from '../../utils/location';
import getRandomMaterialColor from '../../utils/getRandomMaterialColor';

import Component from './Component';

const getPlayerId = flow(
  getQuery,
  get('player'),
);

const edit = createSelector(
  getPlayerId,
  Boolean,
);

const initialValues = createSelector(
  getPlayerId,
  get('players'),
  (playerId, players) =>
    playerId
      ? players[playerId]
      : {
          color: getRandomMaterialColor(map('color', players)),
          sex: MALE,
        },
);

const open = createSelector(
  getPlayerId,
  negate(isUndefined),
);

const mapStateToProps = createStructuredSelector({
  edit,
  initialValues,
  open,
});

const onSubmit = (values, form) => (dispatch) => {
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
};

const mapDispatchToProps = {
  onClose: goBack,
  onSubmit,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
