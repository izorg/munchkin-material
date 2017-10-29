import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { goBack, replace } from 'react-router-redux';

import { setActivePlayer, throwDice } from '../../actions';
import CombatButton from '../Combat/Button';
import Slider from '../../components/Player/Slider';
import SlideRight from '../../components/transitions/Screen/SlideRight';

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

const PlayerSlider = props => (
  <Route path="/player/:id">
    {({ match }) => [
      <SlideRight key="screen" in={Boolean(match)}>
        <Slider {...props} />
      </SlideRight>,
      <CombatButton key="fab" />,
    ]}
  </Route>
);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSlider);
