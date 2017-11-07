import React from 'react';
import { connectAdvanced } from 'react-redux';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import { createSelector } from 'reselect';
import { removePlayer } from 'munchkin-core/es/actions';

import { movePlayer, setActivePlayer, setMultiMode, toggleEditMode, togglePlayer } from '../../actions';

import NewPlayerButton from './NewPlayerButton';
import PlayerList from '../../components/Player/List';

const selector = createSelector(
  state => state.app.editMode,
  state => state.app.multiMode,
  state => state.playerColors,
  state => state.playerList,
  state => state.players,
  state => state.app.selectedPlayerIds,
  (state, dispatch) => dispatch,
  (editMode, multiMode, playerColors, playerList, players, selectedPlayerIds, dispatch) => ({
    editMode,
    multiMode,
    playerColors,
    players: playerList.map(id => players[id]),
    selectedPlayerIds,

    onDeletePlayers: (playerIds) => {
      playerIds.forEach((id) => {
        dispatch(removePlayer(id));
      });
      dispatch(setMultiMode(false));
    },
    onMultiSelectActivate: (id) => {
      dispatch(setMultiMode(true));
      dispatch(togglePlayer(id));
    },
    onMultiSelectDeactivate: () => {
      dispatch(setMultiMode(false));
    },
    onPlayerEdit: (player) => {
      dispatch(setActivePlayer(player.id));
      dispatch(push(`/edit/${player.id}`));
    },
    onPlayerMove: (oldIndex, newIndex) => dispatch(movePlayer(oldIndex, newIndex)),
    onPlayerSelect: (player) => {
      if (multiMode) {
        if (selectedPlayerIds.length === 1 && selectedPlayerIds[0] === player.id) {
          dispatch(togglePlayer(player.id));
          dispatch(setMultiMode(false));
        } else {
          dispatch(togglePlayer(player.id));
        }
      } else {
        dispatch(toggleEditMode(false));
        dispatch(setActivePlayer(player.id));
        dispatch(push(`/player/${player.id}`));
      }
    },
    onToggleEditClick: () => dispatch(toggleEditMode()),
  }),
);

const selectorFactory = dispatch => (state, ownProps) => ({
  ...ownProps,
  ...selector(state, dispatch),
});

const Home = props => (
  <Route path="/">
    {({ match }) => match && [
      <PlayerList key="screen" {...props} />,
      <NewPlayerButton key="fab" />,
    ]}
  </Route>
);

export default connectAdvanced(selectorFactory)(Home);
