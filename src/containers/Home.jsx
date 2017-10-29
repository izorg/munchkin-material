import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import { removePlayer } from 'munchkin-core/es/actions';

import { movePlayer, setActivePlayer, setMultiMode, toggleEditMode, togglePlayer } from '../actions';

import NewPlayerButton from './NewPlayerButton';
import PlayerList from '../components/Player/List';


const mapStateToProps = state => ({
  editMode: state.app.editMode,
  multiMode: state.app.multiMode,
  playerColors: state.playerColors,
  players: state.playerList.map(id => state.players[id]),
  selectedPlayerIds: state.app.selectedPlayerIds,
});

const mapDispatchToProps = dispatch => ({
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
  onPlayerSelect: (player, multiMode, selectedPlayerIds) => {
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
});

const Home = props => (
  <Route path="/">
    {({ match }) => match && [
      <PlayerList key="screen" {...props} />,
      <NewPlayerButton key="fab" />,
    ]}
  </Route>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
