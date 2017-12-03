import React from 'react';
import connect from 'react-redux/es/connect/connect';
import Route from 'react-router-dom/es/Route';
import { goBack, push, replace } from 'react-router-redux/es/actions';

import { setActivePlayer, throwDice } from '../../actions';

import ScreenLoader from '../../containers/ScreenLoader';

const mapStateToProps = ({ app: { activePlayerId }, playerList, players }) => ({
  players: playerList.map(id => players[id]),
  selectedPlayer: players[activePlayerId],
});

const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(goBack()),
  onDiceClick: (player) => {
    dispatch(throwDice());
    dispatch(push(`/player/${player.id}/dice`));
  },
  onPlayerChange: (player) => {
    dispatch(setActivePlayer(player.id));
    dispatch(replace(`/player/${player.id}`));
  },
});

const loader = () => import(/* webpackChunkName: "player", webpackMode: "lazy" */ './Screen');

const Player = props => (
  <Route path="/player/:id">
    {({ match }) => (
      <ScreenLoader
        in={Boolean(match)}
        loader={loader}
        path="/player/:id"
        {...props}
      />
    )}
  </Route>
);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
