import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { goBack } from 'connected-react-router/lib/actions';
import { addPlayer, updatePlayer } from 'munchkin-core/lib/ducks/players';
import createPlayer from 'munchkin-core/lib/utils/createPlayer';
import { MALE } from 'munchkin-core/lib/utils/sex';

import { addPlayerToList } from '../../../../ducks/playerList';
import getRandomMaterialColor from '../../../../utils/getRandomMaterialColor';

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

const mapDispatchToProps = {
  onClose: goBack,
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
)(Component);
