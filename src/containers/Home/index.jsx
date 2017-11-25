import React from 'react';
import { connectAdvanced } from 'react-redux/es';
import Route from 'react-router-dom/es/Route';
import { goBack, push } from 'react-router-redux/es/actions';
import { createSelector } from 'reselect';
import { removePlayer } from 'munchkin-core/es/actions';

import { movePlayer, setActivePlayer, togglePlayer, unselectAllPlayers } from '../../actions';

import NewPlayerButton from './NewPlayerButton';
import PlayerList, { modes } from '../../components/Player/List';

const selector = createSelector(
  state => state.playerColors,
  state => state.playerList,
  state => state.players,
  state => state.app.selectedPlayerIds,
  (state, ownProps) => ownProps.mode,
  (state, ownProps, dispatch) => dispatch,
  (playerColors, playerList, players, selectedPlayerIds, mode, dispatch) => ({
    playerColors,
    players: playerList.map(id => players[id]),
    selectedPlayerIds,

    onDeletePlayers: (playerIds) => {
      playerIds.forEach((id) => {
        dispatch(removePlayer(id));
      });
      dispatch(goBack());
    },
    onMultiSelectActivate: (id) => {
      dispatch(unselectAllPlayers());
      dispatch(togglePlayer(id));
      dispatch(push(`/${modes.MULTI}`));
    },
    onMultiSelectDeactivate: () => {
      dispatch(unselectAllPlayers());
      dispatch(goBack());
    },
    onPlayerEdit: (player) => {
      dispatch(setActivePlayer(player.id));
      dispatch(push(`/${modes.EDIT}/${player.id}`));
    },
    onPlayerMove: (oldIndex, newIndex) => dispatch(movePlayer(oldIndex, newIndex)),
    onPlayerSelect: (player) => {
      if (mode === modes.MULTI) {
        if (selectedPlayerIds.length === 1 && selectedPlayerIds[0] === player.id) {
          dispatch(togglePlayer(player.id));
          dispatch(goBack());
        } else {
          dispatch(togglePlayer(player.id));
        }
      } else {
        dispatch(setActivePlayer(player.id));
        dispatch(push(`/player/${player.id}`));
      }
    },
    onToggleEditClick: () => {
      if (mode === modes.EDIT) {
        dispatch(goBack());
      } else {
        dispatch(push(`/${modes.EDIT}`));
      }
    },
  }),
);

const selectorFactory = dispatch => (state, ownProps) => ({
  ...ownProps,
  ...selector(state, ownProps, dispatch),
});

const ConnectedPlayerList = connectAdvanced(selectorFactory)(PlayerList);

const HomeRoute = props => (
  <Route path="/:mode(edit|multi)?">
    {({ match }) => match && [
      <ConnectedPlayerList key="screen" mode={match.params.mode} {...props} />,
      <NewPlayerButton key="fab" in={match.isExact && !match.params.mode} />,
    ]}
  </Route>
);

export default HomeRoute;
