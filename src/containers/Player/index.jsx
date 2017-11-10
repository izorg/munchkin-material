import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { goBack, replace } from 'react-router-redux';

import { setActivePlayer, throwDice } from '../../actions';

import ScreenLoader from '../ScreenLoader';

const mapStateToProps = ({ app: { activePlayerId }, playerList, players }) => ({
  players: playerList.map(id => players[id]),
  selectedPlayer: players[activePlayerId],
});

const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(goBack()),
  onDiceClick: () => {
    dispatch(throwDice());
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
        {...props}
      />
    )}
  </Route>
);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
